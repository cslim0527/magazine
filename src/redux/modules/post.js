import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore, storage } from '../../shared/firebase'
import moment from 'moment'
import { getFirestore, collection, where, query, getDocs, deleteDoc, doc } from "firebase/firestore"
const db = getFirestore()

const SET_POST = "SET_POST"
const EDIT_POST = "EDIT_POST"
const ADD_POST = "ADD_POST"
const DELETE_POST = "DELETE_POST"
const SET_LOADING = "SET_LOADING"
const SET_ESCAPE = "SET_ESCAPE"

const initialState = {
  list: [],
  paging: { start: null, next: null, step: 3 },
  is_loading: false,
  escape: false
}

const initialPost = {
  id: 0,
  user_info: {
    user_name: 'chansoo',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OIGMK3BVRNBYNKWMUKJMFXBDG4.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  layout_type: 'top',
  insert_dt: '2021-02-27 10:00:00'
}

// action creator
const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}))
const addPost = createAction(ADD_POST, (post) => ({post}))
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}))
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}))
const setLoading = createAction(SET_LOADING, (is_loading) => ({is_loading}))
const setEscape = createAction(SET_ESCAPE, (escape) => ({escape}))

// middlewares
const deletePostFB = (post) => {
  return async (dispatch, getState, { history }) => {

    if (!post) {
      alert('포스팅 정보가 올바르지 않아 삭제 할 수 없습니다.')
      return
    }

    console.log('[deletePostFB]', post)

    const deleteConfirm = window.confirm('삭제하실 경우 게시물 정보를 다시 복구 할 수 없습니다.\n삭제하시겠습니까?')

    if (!deleteConfirm) {
      return
    }

    try {
      await deleteDoc(doc(db, "post", post.post_id))

      if (post.image_id) {
        const _remove = storage.ref().child(`images/${post.image_id}`)
        _remove.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
          console.log('[삭제 오류]', error)
        })
      }

      if (post.comment_cnt > 0) {
        const commentRef = collection(db, "comment");
        const q = query(commentRef, where("post_id", "==", post.post_id))
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach( async (comment) => {
          await deleteDoc(doc(db, "comment", comment.id))
        })
      }

      dispatch(deletePost(post.post_id))
     
      history.replace('/')
    }
    catch(err) {
      console.log('[error] 존재하지 않는 정보입니다.', err)
      history.replace('/')
    }
   
    
  }
}

const editPostFB = (post_id=null, post ={}) => {
  return (dispatch, getState, { history }) => {

    if (!post_id) {
      return
    }

    const _post = getState().post.list.filter(p => p.id === post_id)[0]
    const before_image = _post.file.uid
    const now_image = post.u_name

    // 이미지가 있으면서 이미지를 변경했을때 기존 storage 삭제
    if (before_image !== now_image) {
      const _remove = storage.ref().child(`images/${before_image}`)
      _remove.delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('[삭제 오류]', error)
      });
    }

    // 데이터 업데이트
    const new_post = {
      ..._post,
      contents: post.contents,
      image_url: post.url,
      layout_type: post.layoutVal,
      file: {
        name: post.name,
        size: post.size,
        uid: post.u_name,
      },
    }

    const postDB = firestore.collection('post')
    postDB.doc(post_id).update(new_post).then(doc => {
      dispatch(editPost(post_id, new_post))
      history.replace('/')
    })

    if (post.file) {
      storage.ref(`images/${post.u_name}`).put(post.file)
    }

  }
}

const getPostFB = (start=null, step=3 ) => {
  return (dispatch, getState) => {

    const _paging = getState().post.paging
    if (_paging.start && !_paging.next) {
      return
    }

    dispatch(setLoading(true))
    const postDB = firestore.collection('post')

    // 최신순으로 정렬
    let query = postDB.orderBy('insert_dt', 'desc')

    if (start) {
      query = query.startAt(start) 
    }

    query
      .limit(step + 1)
      .get()
      .then((docs) => {
        console.log('무한스크롤', docs.docs)
        const post_list = []
        const paging = {
          start: docs.docs[0],
          next: docs.docs.length === step + 1 ? docs.docs[docs.docs.length - 1] : null,
          step: step
        }

        docs.forEach(doc => {
          const { user_info,
                  file, 
                  image_url, 
                  contents, 
                  comment_cnt,
                  insert_dt,
                  layout_type
                } = doc.data()

          const post = {
            id: doc.id,
            user_info: {
              ...user_info
            },
            file: {
              ...file
            },
            image_url,
            contents,
            comment_cnt,
            insert_dt,
            layout_type
          }

          post_list.push(post)
        })

        if (docs.docs.length === step + 1) {
          post_list.pop()
        }

        dispatch(setPost(post_list, paging))
      })
  }
}

const addPostFB = (post) => {
  console.log('addpost', post)
  return (dispatch, getState, {history}) => {

    const _post = {
      user_info: {
        ...getState().user.user
      },
      layout_type: post.layoutVal,
      image_url: post.url,
      contents: post.contents,
      comment_cnt: 0,
      file: {
        uid: post.u_name,
        name: post.name,
        size: post.size
      },
      insert_dt: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    const postDB = firestore.collection('post')
    postDB
      .add(_post)
      .then((doc) => {
        const post = {
          ..._post,
          id: doc.id
        }

        dispatch(addPost(post))
        history.replace('/')
      })
      .catch(error => {
        dispatch(setLoading(false))
        alert('[작성 오류] 게시물에 작성이 실패하였습니다.')
        console.log('[작성 오류]', error)
      })

    storage.ref(`images/${post.u_name}`).put(post.file)
    
  }
}

const getOnePostFB = (id) => {
  return (dispatch, getState) => {
    const postDB = firestore.collection('post')
    postDB
      .doc(id)
      .get()
      .then(doc => {
        if (!doc.data()) {
          dispatch(setEscape(true))
        } else {
          const post = {
            ...doc.data(),
            id,
          }
          dispatch(setPost([post]))
          dispatch(setEscape(false))
        }
      })
  }
}

// reducer
export default handleActions({
  [SET_POST]: (state, action) => produce(state, (draft) => {
    draft.list.push(...action.payload.post_list)

    draft.list = draft.list.reduce((acc, cur) => {
      if (acc.findIndex(item => item.id === cur.id) === -1) {
        return [...acc, cur]
      } else {
        acc[acc.findIndex(item => item.id === cur.id)] = cur
        return acc
      }
    }, [])

    if (action.payload.paging) {
      draft.paging = action.payload.paging
    }

    draft.is_loading = false
  }),

  [ADD_POST]: (state, action) => produce(state, (draft) => {
    draft.list.unshift(action.payload.post)
    draft.is_loading = false
  }),

  [DELETE_POST]: (state, action) => produce(state, (draft) => {
    const post_id = action.payload.post_id
    draft.list = draft.list.filter(post => post.id !== post_id)
  }),

  [EDIT_POST]: (state, action) => produce(state, (draft) => {
    const idx = draft.list.findIndex(post => post.id === action.payload.post_id)
    draft.list[idx] = {
      ...state.list[idx],
      ...action.payload.post
    }
    
    draft.is_loading = false
  }),

  [SET_LOADING]: (state, action) => produce(state, (draft) => {
    draft.is_loading = action.payload.is_loading
  }),

  [SET_ESCAPE]: (state, action) => produce(state, (draft) => {
    draft.escape = action.payload.escape
  })
}, initialState)

const actionCreators = {
  setPost,
  addPost,
  editPost,
  setLoading,
  getPostFB,
  addPostFB,
  getOnePostFB,
  editPostFB,
  deletePostFB
}

export { actionCreators }
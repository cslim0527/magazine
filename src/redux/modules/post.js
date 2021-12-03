import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore } from '../../shared/firebase'
import moment from 'moment'

const SET_POST = "SET_POST"
const EDIT_POST = "EDIT_POST"
const ADD_POST = "ADD_POST"
const SET_LOADING = "SET_LOADING"

const initialState = {
  list: [],
  paging: { start: null, next: null, step: 3 },
  is_loading: false
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
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}))
const setLoading = createAction(SET_LOADING, (is_loading) => ({is_loading}))

// middlewares
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

        // post_list.pop()

        dispatch(setPost(post_list, paging))
      })
  }
}

const addPostFB = (post) => {
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
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
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
  }
}

const getOnePostFB = (id) => {
  return (dispatch, getState) => {
    const postDB = firestore.collection('post')
    postDB.doc(id).get().then(doc => {
      const post = {
        ...doc.data(),
        id,
      }

      dispatch(setPost([post]))
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

  [EDIT_POST]: (state, action) => produce(state, (draft) => {
    console.log('[EDIT_POST]', action)
    const idx = draft.list.findIndex(post => post.id === action.payload.post_id)
    draft.list[idx] = {
      ...state.list[idx],
      ...action.payload.post
    }
  }),

  [SET_LOADING]: (state, action) => produce(state, (draft) => {
    draft.is_loading = action.payload.is_loading
  })
}, initialState)

const actionCreators = {
  setPost,
  addPost,
  editPost,
  setLoading,
  getPostFB,
  addPostFB,
  getOnePostFB
}

export { actionCreators }
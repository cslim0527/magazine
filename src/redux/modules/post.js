import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore } from '../../shared/firebase'
import moment from 'moment'

const SET_POST = "SET_POST"
const ADD_POST = "ADD_POST"
const SET_LOADING = "SET_LOADING"

const initialState = {
  list: [],
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
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}))
const setLoading = createAction(SET_LOADING, (is_loading) => ({is_loading}))

// middlewares
const getPostFB = () => {
  return (dispatch, getState) => {
    const postDB = firestore.collection('post')

    // 20개씩 최신순으로 정렬
    const query = postDB.orderBy('insert_dt', 'desc').limit(20)

    query
      .get().then((docs) => {
        const post_list = []
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

        dispatch(setPost(post_list))
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

// reducer
export default handleActions({
  [SET_POST]: (state, action) => produce(state, (draft) => {
    draft.list = action.payload.post_list
  }),

  [ADD_POST]: (state, action) => produce(state, (draft) => {
    draft.is_loading = false
    draft.list.unshift(action.payload.post)
  }),

  [SET_LOADING]: (state, action) => produce(state, (draft) => {
    draft.is_loading = action.payload.is_loading
  })
}, initialState)

const actionCreators = {
  setPost,
  addPost,
  setLoading,
  getPostFB,
  addPostFB
}

export { actionCreators }
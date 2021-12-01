import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { firestore } from '../../shared/firebase'

const SET_POST = "SET_POST"
const ADD_POST = "ADD_POST"

const initialState = {
  list: []
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
  insert_dt: '2021-02-27 10:00:00'
}

// action creator
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}))

// middlewares
const getPostFB = () => {
  return (dispatch, getState) => {
    const postDB = firestore.collection('post')
    postDB
      .get()
      .then((docs) => {
        const post_list = []
        docs.forEach(doc => {

          const { user_nick, 
                  user_profile, 
                  image_url, 
                  contents, 
                  comment_cnt,
                  insert_dt
                } = doc.data()

          const post = {
            id: doc.id,
            user_info: {
              user_nick,
              user_profile,
            },
            image_url,
            contents,
            comment_cnt,
            insert_dt
          }

          post_list.push(post)
          dispatch(setPost(post_list))
        })
      })
  }
}

const addPostFB = (post) => {
  return (dispath, getState, {history}) => {
    
  }
}

// reducer
export default handleActions({
  [SET_POST]: (state, action) => produce(state, (draft) => {
    draft.list = action.payload.post_list
  }),

  [ADD_POST]: (state, action) => produce(state, (draft) => {}),

}, initialState)

const actionCreators = {
  setPost,
  addPost,
  getPostFB
}

export { actionCreators }
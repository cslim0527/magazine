import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore"

const db = getFirestore()

const GET_LIKE = "GET_LIKE"
const ADD_LIKE = "ADD_LIKE"

const initialState = {
  likes: [],
}

// action creators
const getLike = createAction(GET_LIKE, (like_list) => ({like_list}))
const addLike = createAction(ADD_LIKE, (post_id, user_id) => ({post_id, user_id}))

// middlewars
const getLikeFB = (user_id) => {
  return async (dispatch, getState) => {

    if (!user_id) {
      return
    }

    const likeDB = collection(db, 'like')
    const likeQuery = query(likeDB, where('user_id', '==', user_id))
    const likeSnapshot = await getDocs(likeQuery)
    
    let likes = []
    likeSnapshot.forEach(doc => {
      likes.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch(getLike(likes))

  }
}

// reducer
export default handleActions({
  [ADD_LIKE]: (state, action) => produce(state, (draft) => {
  }),

  [GET_LIKE]: (state, action) => produce(state, (draft) => {
    draft.likes = action.payload.like_list
  })

}, initialState)

const actionCreators = {
  addLike,
  getLike,
  getLikeFB
}

export { actionCreators }
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import firebase from 'firebase/compat/app'
import "moment";
import moment from "moment";
import { actionCreators as postActions } from "./post";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (post_id, comment_id) => ({post_id, comment_id}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return (dispatch, getState, {history}) => {
    const commentDB = firestore.collection('comment')
    const user_info = getState().user.user

    const { user_nick, uid, user_profile } = user_info
    let comment = {
      post_id,
      user_id: uid,
      user_nick,
      user_profile,
      contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss')
    }

    commentDB
      .add(comment)
      .then(doc => {
        const postDB = firestore.collection('post')
        const post = getState().post.list.find(list => list.id === post_id)
        const increment = firebase.firestore.FieldValue.increment(1)

        comment = {
          ...comment,
          id: doc.id
        }

        postDB
          .doc(post_id)
          .update({comment_cnt: increment})
          .then(_post => {
            dispatch(addComment(post_id, comment))

            console.log('edit 직전', post)
            if (post) {
              dispatch(postActions.editPost(post_id, {comment_cnt: Number(post.comment_cnt) + 1}))
            }
          })
      })
  }
}

const deleteCommentFB = (post_id, comment_id) => {
  return (dispatch, getState, { history }) => {
    console.log('[deleteCommentFB]')
    if (!post_id || !comment_id) {
      return
    }

    const commentDB = firestore.collection('comment')
    commentDB
    .doc(comment_id)
    .delete()
    .then((doc) => {
      // 해당 comment 삭제 완료 시 post DB 카운트 수정
      const postDB = firestore.collection('post')
      const increment = firebase.firestore.FieldValue.increment(-1)

      postDB
      .doc(post_id)
      .update({comment_cnt: increment})
      .then(_post => {
        dispatch(deleteComment(post_id, comment_id))
        const post = getState().post.list.find(list => list.id === post_id)

        if (post) {
          dispatch(postActions.editPost(post_id, {comment_cnt: Number(post.comment_cnt) - 1}))
        }
      })

    })
    .catch(err => {
      console.log('[deleteCommentFB] 댓글을 삭제 할 수 없습니다.', err)
    })
  }
}

const getCommentFB = (post_id) => {
    return function(dispatch, getState, {history}){
      if (!post_id) {
        return
      }

      const commentDB = firestore.collection('comment')
      commentDB
        .where('post_id', '==', post_id)
        .orderBy('insert_dt', 'desc')
        .get()
        .then(docs => {
          let list = []
          docs.forEach(doc => {
            list.push({...doc.data(), id: doc.id})
          })
          dispatch(setComment(post_id, list))
        })
        .catch(err => {
            console.log('[getCommentFB] 댓글정보 불러오기를 실패했습니다.', err)
        })
    }
}

export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment)
      }),
      [DELETE_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id] = 
          draft.list[action.payload.post_id]
          .filter(comment => {
            return comment.id !== action.payload.comment_id
          })
      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  deleteCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
import React from 'react';
import { Grid, Text, Img, Button } from "../elements"
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'

const CommentItem = ({ item }) => {
  const dispatch = useDispatch()
  const login_uid = useSelector(state => state.user.user?.uid)

  const handleDeleteComment = () => {
    dispatch(commentActions.deleteCommentFB(item.post_id, item.id))
  }
  return (
    <li key={item.id} style={{marginBottom: '15px'}}>
      <Grid is_flex>
        <Grid style={{flexShrink: '0'}} is_flex width="auto" margin="0 10px 0 0">
          <Img shape="circle" margin="0 10px 0 0" user_profile=""/>
          <Text bold margin="0 auto 0 0">{item.user_nick}</Text>
        </Grid>
        <Text width="100%" margin="0 auto 0 0">{item.contents}</Text>
        { login_uid === item.user_id && <Button _onClick={handleDeleteComment} ver="white">삭제</Button>}
      </Grid>
    </li> 
  );
};

export default CommentItem;
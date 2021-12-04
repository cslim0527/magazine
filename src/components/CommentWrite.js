import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Img, Button, Textarea } from "../elements"
import { actionCreators as commentActions } from '../redux/modules/comment'

import Permit from '../shared/Permit'

const CommentWrite = (props) => {
  const dispatch = useDispatch()
  const { user_info } = props
  const [comment, setComment] = useState('')

  const handleInputComment = (e) => {
    setComment(e.target.value)
  }

  const handleAddComment = () => {
    dispatch(commentActions.addCommentFB(props.post_id, comment))
    setComment('')
  }

  const handleKeyEvent = (e) => {
    if (e.key === 'Enter' && e.altKey) {
      handleAddComment()
    }
  }

  return (
    <Permit>
      <Grid style={{borderRadius: '0'}} border="border-top: 1px solid var(--border-color)" is_flex padding="16px">
        <Grid is_flex>
          <Img shape="circle" margin="0 10px 0 0" user_profile={ user_info.user_profile }/>
          <Textarea _onKeyUp={handleKeyEvent} value={comment} _onChange={handleInputComment} border="0" padding="0" height="18px" placeholder="댓글을 입력해주세요 :)   [Alt+Enter 키로 작성]"/>
          <Button _onClick={handleAddComment} margin="0 0 0 10px">작성</Button>
        </Grid>
      </Grid>
    </Permit>
  )
}

CommentWrite.defaultProps = {
  user_info: {
    user_name: 'chansoo',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OIGMK3BVRNBYNKWMUKJMFXBDG4.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  insert_dt: '2021-02-27 10:00:00'
}

export default CommentWrite
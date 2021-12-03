import React, { useEffect } from 'react';
import { Grid, Text, Img, Button } from "../elements"
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'

import ScrollTop from '../shared/ScrollTop';
import CommentItem from './CommentItem';

const CommentList = (props) => {
  const { post_id } = props
  const dispatch = useDispatch()
  const comment_list = useSelector(state => state.comment.list)

  useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id))
    }
  }, [])

  return (
    <ScrollTop>
      <Grid style={{borderRadius: '0'}} border="border-top: 1px solid var(--border-color)" padding="16px">
        <ul>
          {
            comment_list[post_id]?.map((item, idx) => {
              return <CommentItem key={idx} item={item} />
            })
          }
        </ul>
      </Grid>
    </ScrollTop>
  );
};

CommentList.defaultProps = {
  post_id: null,
  user_info: {
    user_name: 'chansoo',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OIGMK3BVRNBYNKWMUKJMFXBDG4.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  insert_dt: '2021-02-27 10:00:00'
}


export default CommentList;
import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"

import { Grid } from "../elements"
import Post from "../components/Post"
import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"
import PulseLoader from "react-spinners/PulseLoader"
import Escape from "../shared/Escape"

const PostDetail = (props) => {
  const paramId = useParams().id
  const dispatch = useDispatch()

  const myId = useSelector(state => state.user.user)?.uid
  const postList = useSelector(state => state.post.list)
  const postIdx = postList.findIndex(post => post.id === paramId)
  const postData = postList[postIdx]
  const isMine = myId === postData?.user_info?.uid

  const escape = useSelector(state => state.post.escape)

  // FIXME  새로고침 후 뒤로가기 했을때 데이터 배열 순서 바뀌는 것 해결하기
  useEffect(() => {
    if (postData) {
      return
    }

    dispatch(postActions.getOnePostFB(paramId))
  }, [])

  if (escape) {
    return (
      <Grid is_container>
        <Escape/>
      </Grid>
    )
  }

  return (
      <>
      {
        !postData 
          ? 
            (
              <Grid is_container style={{textAlign: 'center', padding: '80px'}}>
                <PulseLoader color="#ccc" size="12px"/>
              </Grid>
            )
          : 
            (
            <Grid is_container margin="25px auto 0 auto" bg="#fff" border="border: 1px solid var(--border-color)" round>
              <Post {...postData} is_detail isMe={isMine} />

              <CommentWrite post_id={paramId}/>
              <CommentList post_id={paramId}/>
            </Grid>
            )
      }
      
      </>
  )
}

PostDetail.defaultProps = {
  user_info: {
    user_name: '',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OIGMK3BVRNBYNKWMUKJMFXBDG4.jpg',
  contents: '',
  comment_cnt: 0,
  insert_dt: ''
}

export default PostDetail 
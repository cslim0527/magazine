import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"
import { actionCreators as likeActions } from "../redux/modules/like"

import Post from "../components/Post"
import { Grid, Button, Text } from "../elements"
import AddIcon from '@material-ui/icons/Add'
import Permit from "../shared/Permit"
import InfinityScroll from "./InfinityScroll"

const PostList = (props) => {
  const dispatch = useDispatch()
  const history = props.history
  const myInfo = useSelector(state => state.user.user)
  const postList = useSelector(state => state.post.list)
  const paging = useSelector(state => state.post.paging)
  const likes = useSelector(state => state.like.likes)

  useEffect(() => {
    if (postList.length < 2) {
      dispatch(postActions.getPostFB())
    }
  }, [])

  useEffect(() => {
    dispatch(likeActions.getLikeFB(myInfo?.uid))
  }, [myInfo])

  const handleMoveWriteBtn = () => {
    history.push('/editor')
  }

  const handleAddPage = () => {
    dispatch(postActions.getPostFB(paging.next))
  }

  if (postList.length === 0) {
    return (
      <Grid is_container margin="100px auto 0 auto">
        <Text center>
          게시물이 없습니다.
          <br/><br/>
          새로운 게시물를 작성해주세요 :)
        </Text>

        {
          myInfo ? <Button _onClick={() => history.push('/editor')} margin="20px auto">게시물 작성</Button> : <Button _onClick={() => history.push('/login')} margin="20px auto">로그인하고 게시물 작성하기</Button>
        }

        <Permit>
          <Button _onClick={handleMoveWriteBtn} width="50px" height="50px" circle floating="bottom: 40px; right: 20px;"><AddIcon/></Button>
        </Permit>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <InfinityScroll callNext={handleAddPage} paging={paging}>
        <Grid is_container margin="25px auto 0 auto">
          {
            postList.map((post, idx) => {
              const like_on = likes.some(l => l.post_id === post.id)
              const isMe = post.user_info?.uid === myInfo?.uid
              return <Post key={idx} {...post} isMe={isMe} like_on={like_on}/>
            })
          }
        </Grid>
      </InfinityScroll>

      <Permit>
        <Button _onClick={handleMoveWriteBtn} width="50px" height="50px" circle floating="bottom: 40px; right: 20px;"><AddIcon/></Button>
      </Permit>
    </React.Fragment>
  )
}

export default PostList 
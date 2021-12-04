import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"
import { actionCreators as likeActions } from "../redux/modules/like"

import Post from "../components/Post"
import { Grid, Button } from "../elements"
import AddIcon from '@material-ui/icons/Add'
import Permit from "../shared/Permit"
import InfinityScroll from "./InfinityScroll"

const PostList = (props) => {
  console.log('[PostList]')
  const dispatch = useDispatch()
  const history = props.history
  const myInfo = useSelector(state => state.user.user)
  const postList = useSelector(state => state.post.list)
  const paging = useSelector(state => state.post.paging)
  const likes = useSelector(state => state.like.likes)
  console.log('좋아요정보', likes)

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
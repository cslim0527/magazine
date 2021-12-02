import React, { useEffect, useCallback } from "react"
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"

import Post from "../components/Post"
import { Grid, Button } from "../elements"
import AddIcon from '@material-ui/icons/Add'
import Permit from "../shared/Permit"
import InfinityScroll from "./InfinityScroll"

const PostList = (props) => {
  console.log('[PostList]')
  const dispatch = useDispatch()
  const history = props.history
  const postList = useSelector(state => state.post.list)
  const paging = useSelector(state => state.post.paging)

  useEffect(() => {
    dispatch(postActions.getPostFB())
  }, [])

  const handleMoveWriteBtn = () => {
    history.push('/postwrite')
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
              return <Post key={idx} {...post} />
            })
          }
        </Grid>
      </InfinityScroll>

      <Permit>
        <Button _onClick={handleAddPage} width="50px" height="50px" circle floating="bottom: 40px; right: 100px;"><AddIcon/></Button>
        <Button _onClick={handleMoveWriteBtn} width="50px" height="50px" circle floating="bottom: 40px; right: 20px;"><AddIcon/></Button>
      </Permit>
    </React.Fragment>
  )
}

export default PostList 
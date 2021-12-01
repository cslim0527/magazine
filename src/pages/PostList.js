import React, { useEffect } from "react"
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"

import Post from "../components/Post"
import { Grid, Button } from "../elements"
import AddIcon from '@material-ui/icons/Add'
import Permit from "../shared/Permit"

const PostList = (props) => {
  const dispatch = useDispatch()
  const history = props.history
  const postList = useSelector(state => state.post.list)
  console.log('리스트!', postList)

  useEffect(() => {
    dispatch(postActions.getPostFB())
  }, [])

  const handleMoveWriteBtn = () => {
    history.push('/postwrite')
  }

  return (
    <React.Fragment>
      <Grid is_container margin="25px auto 0 auto">
        {
          postList.map((post, idx) => {
            return <Post key={idx} {...post} />
          })
        }
      </Grid>

      <Permit>
        <Button _onClick={handleMoveWriteBtn} width="50px" height="50px" circle floating="bottom: 40px; right: 20px;"><AddIcon/></Button>
      </Permit>
    </React.Fragment>
  )
}

export default PostList 
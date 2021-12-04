import React, { useState } from "react"
import { useParams } from "react-router"
import { history } from '../redux/configureStore'
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import PopHeart from "../shared/PopHeart"
import { Grid, Text, Img, Button } from "../elements"
import Permit from '../shared/Permit'

const Post = (props) => {
  const { like_on, user_info, image_url, contents, comment_cnt, layout_type, like_cnt, insert_dt, isMe, is_detail } = props
  const dispatch = useDispatch()
  const [like, setLike] = useState(like_cnt)
  const [heart, setHeart] = useState(like_on)
  const paramId = useParams().id
  const post_data = useSelector(state => state.post.list)[0]

  const getLayoutType = layout_type && Object.keys(layout_type).filter(key => {
        if (layout_type[key]) {
          return key
        }
      })[0]

  const handleClickHeartBtn = () => {
    if (heart) {
      setHeart(false)
      setLike(like - 1)
    } else {
      setHeart(true)
      setLike(like + 1)
    }
  }

  const handleClickDetailBtn = () => {
    history.push(`/post/${props.id}`)
  }

  const handleEditPost = () => {
    history.push(`/editor/${props.id}`)
  }

  const handleDeletePost = () => {
    const delete_post = {
      post_id: paramId,
      comment_cnt: post_data.comment_cnt,
      image_id: post_data.file.uid
    }

    // post_id/ 이미지 id/ 댓글 정보
    dispatch(postActions.deletePostFB(delete_post))
  }

  let postInnerCont = ''
  if (getLayoutType === 'left') {
    postInnerCont = (
      <Grid is_flex>
      <Grid padding="16px">
        <Text>
          { contents }
        </Text>
      </Grid>

      <Grid>
        { image_url && <Img _onClick={!is_detail ? handleClickDetailBtn : null} shape="rect" content_img={ image_url }/>}
      </Grid>
    </Grid>

    )
    
  } else if (getLayoutType === 'right') {
    postInnerCont = (
      <Grid is_flex>
      <Grid padding="16px">
        <Text>
          { contents }
        </Text>
      </Grid>

      <Grid style={{order: '-1'}}>
        { image_url && <Img _onClick={!is_detail ? handleClickDetailBtn : null} shape="rect" content_img={ image_url }/>}
      </Grid>
    </Grid>
    )
  } else {
    postInnerCont = (
      <Grid>
        <Grid padding="16px">
          <Text>
            { contents }
          </Text>
        </Grid>

        <Grid>
          { image_url && <Img _onClick={!is_detail ? handleClickDetailBtn : null} shape="rect" content_img={ image_url }/>}
        </Grid>
      </Grid>
    )
  }

  return (
      <Grid margin={!is_detail && "20px 0"} bg="#fff" border={!is_detail && "border: 1px solid var(--border-color)"} round>
        <Grid is_flex padding="16px">

          <Grid is_flex>
            <Img shape="circle" margin="0 10px 0 0" user_profile={ user_info.user_profile }/>
            <Text bold margin="0 auto 0 0">{ user_info.user_nick }</Text>
          </Grid>

          <Grid is_flex>
            <Text color="#8e8e8e" size="12px" margin="0 0 0 auto">{insert_dt}</Text>
            { !paramId && isMe && <Button _onClick={handleEditPost} size="12px" ver="white">편집</Button> }
            { paramId && isMe && <Button _onClick={handleDeletePost} size="12px" ver="white">삭제</Button> }
          </Grid>

        </Grid>

        { postInnerCont }

        <Grid is_flex padding="16px">

        {
          paramId ? <Text bold>댓글 {comment_cnt}개</Text> : <Text bold>좋아요 {like}개</Text>
        }
          

        {
          !paramId && 
          (
            <Button _onClick={handleClickDetailBtn} style={{position: 'relative', top: '1x'}}size="11px" ver='heart-off' margin="0 0 0 auto">
              <ChatBubbleOutlineIcon/>
            </Button>
          )
        }
          
          <Permit>
            <Button _onClick={handleClickHeartBtn} size="12px" ver={heart ? 'heart-on': 'heart-off'}>
              {heart ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </Button>
          </Permit>
        </Grid>

        { heart && <PopHeart play={heart}/> }
        
      </Grid>
  )
}

Post.defaultProps = {
  user_info: {
    user_name: '',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png',
  contents: '',
  comment_cnt: 0,
  insert_dt: '',
  like_cnt: 0
}

export default Post 
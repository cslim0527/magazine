import React, { useState } from "react"
import styled  from 'styled-components'

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PopHeart from "../shared/PopHeart";
import { Grid, Text, Img, Button } from "../elements"

const Post = (props) => {
  const { user_info, image_url, contents, comment_cnt, insert_dt } = props
  const [like, setLike] = useState(comment_cnt)
  const [heart, setHeart] = useState(false)

  const handleClickHeartBtn = () => {
    if (heart) {
      setHeart(false)
      setLike(like - 1)
    } else {
      setHeart(true)
      setLike(like + 1)
    }
  }

  return (
      <Grid margin="20px 0" bg="#fff" border="border: 1px solid var(--border-color)" round>
        <Grid is_flex padding="16px">

          <Grid is_flex>
            <Img shape="circle" margin="0 10px 0 0" user_profile={ user_info.user_profile }/>
            <Text bold margin="0 auto 0 0">{ user_info.user_name }</Text>
          </Grid>

          <Grid is_flex>
            <Text color="#8e8e8e" size="12px" margin="0 0 0 auto">6시간 전</Text>
            <Button size="12px" ver="white">편집</Button>
          </Grid>

        </Grid>

        <Grid>
          <Grid padding="16px">
            { contents }
          </Grid>

          <Grid>
            { image_url && <Img shape="rect" content_img={ image_url }/>}
          </Grid>
        </Grid>

        <Grid is_flex padding="16px">
          <Text bold>좋아요 {like}개</Text>
          <Button _onClick={handleClickHeartBtn} size="12px" ver={heart ? 'heart-on': 'heart-off'}>
            {heart ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
          </Button>
        </Grid>

        { heart && <PopHeart play={heart}/> }
        
      </Grid>
  )
}

Post.defaultProps = {
  user_info: {
    user_name: 'chansoo',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OIGMK3BVRNBYNKWMUKJMFXBDG4.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  insert_dt: '2021-02-27 10:00:00'
}

export default Post 
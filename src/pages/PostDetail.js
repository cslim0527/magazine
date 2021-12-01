import React, { useState } from "react"
import styled  from 'styled-components'

import { Grid, Text, Img, Button, Input, Textarea } from "../elements"

const PostDetail = (props) => {
  const history = props.history
  const { user_info, image_url, contents, comment_cnt, insert_dt } = props

  return (
      <Grid is_container margin="25px auto 0 auto" bg="#fff" border="border: 1px solid var(--border-color)" round>
        <Grid is_flex padding="16px">

          <Grid is_flex>
            <Img shape="circle" margin="0 10px 0 0" user_profile={ user_info.user_profile }/>
            <Text bold margin="0 auto 0 0">게시자 닉네임</Text>
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
          <Text bold>댓글 10개</Text>
        </Grid>

        <Grid style={{borderRadius: '0'}} border="border-top: 1px solid var(--border-color)" is_flex padding="16px">
          <Grid is_flex>
            <Img shape="circle" margin="0 10px 0 0" user_profile={ user_info.user_profile }/>
            <Textarea border="0" padding="0" height="18px" placeholder="댓글 작성"/>
            <Button margin="0 0 0 10px">작성</Button>
          </Grid>
        </Grid>

        <Grid style={{borderRadius: '0'}} border="border-top: 1px solid var(--border-color)" padding="16px">
          <ul>
            <li>
              <Grid is_flex>
                <Grid style={{flexShrink: '0'}} is_flex width="auto" margin="0 10px 0 0">
                  <Img shape="circle" margin="0 10px 0 0" user_profile={ user_info.user_profile }/>
                  <Text bold margin="0 auto 0 0">게시자 닉네임</Text>
                </Grid>
                <Text width="100%" margin="0 auto 0 0">게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임게시자 닉네임</Text>
                <Button ver="white">삭제</Button>
              </Grid>
            </li> 
          </ul>
        </Grid>
      </Grid>
  )
}

PostDetail.defaultProps = {
  user_info: {
    user_name: 'chansoo',
    user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png',
  },
  image_url: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/OIGMK3BVRNBYNKWMUKJMFXBDG4.jpg',
  contents: '고양이네요!',
  comment_cnt: 10,
  insert_dt: '2021-02-27 10:00:00'
}

export default PostDetail 
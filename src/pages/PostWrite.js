import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { storage } from '../shared/firebase'
import { actionCreators as postActions } from '../redux/modules/post'

import ImgUploader from "../components/ImgUploader"
import { Grid, Button, Text } from "../elements"
import Textarea from '../elements/Textarea'
import PulseLoader from "react-spinners/PulseLoader";

const PostWrite = (props) => {
  const history = props.history
  const dispatch = useDispatch()
  const taRef = useRef(null) 
  const userEmail = useSelector(state => state.user.user?.user_email)
  const isLoading = useSelector(state => state.post.is_loading)

  const initailLayoutVal = {top: true, right: false, left: false}
  const initialimageDetail = {name: '비어있음', size: '0', u_name: null, url: null }
  const [contents, setContents] = useState('')
  const [layoutVal, setLayoutVal] = useState(initailLayoutVal)
  const [imageDetail, setImageDetail] = useState(initialimageDetail)
  const [isUploading, setIsUploading] = useState(false) // uploading 상태

  const byteCalc = (x) => {
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(x) / Math.log(1024));
    return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
  }

  const handleChangeContents = (e) => {
    setContents(e.target.value)
  }

  const handleChangeLayout = (e) => {
    const reset = {top: false, right: false, left: false}
    setLayoutVal({
      ...reset,
      [e.target.value]: true
    })
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const allowType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
    const isAllowed = allowType.some(type => file.type === type)
    if (!isAllowed) {
      alert('이미지 파일 형식만 업로드 할 수 있습니다.')
      return 
    }

    setIsUploading(true)

    // file state 객체 변경
    const now = new Date().getTime()

    // dataURL 가져와서 preview 세팅 
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImageDetail({
        file: file,
        name: file.name,
        size: byteCalc(file.size),
        url: reader.result,
        u_name: `${userEmail}_${now}_${file.name}`
      })

      setIsUploading(false)
    }

    reader.onerror = () => {
      console.log(reader.error)
    }

  }

  const removeFB = () => {
    // 이미지가 비어있는 초기 상태일 경우 리턴
    if (imageDetail.u_name === null) return

    setImageDetail({name: '비어있음', size: '0', u_name: null, url: null })

    // const _remove = storage.ref().child(`images/${imageName}`)
    // _remove.delete().then(function() {
    //   // File deleted successfully
    //   setImageDetail({name: '비어있음', size: '0', u_name: null, url: null })
    // }).catch(function(error) {
    //   // Uh-oh, an error occurred!
    //   alert('[오류] 이미지 정보를 처리 할 수 없습니다. \n 다시 시도해 주세요.')
    //   console.log('[삭제 오류]', error)
    // });
  }

  const uploadFB = () => {
    storage.ref(`images/${imageDetail.u_name}`).put(imageDetail.file)
  }
  
  const handleClickCancelUpload = () => {
    removeFB()
  }

  const handleClickWriteBtn = () => {
    if (contents === '') {
      alert('내용을 입력해주세요.')
      taRef.current.focus()
      return
    }

    if (imageDetail.file) {
      uploadFB()
    }

    console.log('넘어갈 데이터',{layoutVal, contents, ...imageDetail})
    dispatch(postActions.setLoading(true))
    dispatch(postActions.addPostFB({layoutVal, contents, ...imageDetail}))
  }

  return (
      <WriteArea>
        <Grid is_container margin="25px auto 0 auto">
          <Grid padding="16px">
            <Text bold size="16px">새 게시물</Text>
          </Grid>

          <Grid bg="white" margin="0 0 10px 0" border="border: 1px solid var(--border-color)" padding="16px">
            <Text bold size="15px" margin="0 0 20px 0">· 사진정보</Text>

            <Grid className="responsive-uploader" style={{alignItems: 'flex-start'}} is_flex height="216px;" padding="5px 0 0 0">
              <ImgUploader _onChange={handleChangeFile} isUploading={isUploading} imageUrl={imageDetail.url} accept="image/*"/>
              <Grid width="80%" margin="0 0 0 20px">
                <Text margin="0 0 5px 0" bold>사진명</Text>
                <Text margin="0 0 10px 0">{imageDetail.name}</Text>
                <Text margin="0 0 5px 0" bold>용량</Text>
                <Text margin="0 0 20px 0">{imageDetail.size}</Text>
                { imageDetail.url && <Button _onClick={handleClickCancelUpload}>업로드 취소</Button> }
              </Grid>
            </Grid>
          </Grid>

          <Grid bg="white" margin="0 0 10px 0" border="border: 1px solid var(--border-color)" padding="16px">
            <Text bold size="15px" margin="0 0 5px 0">· 레이아웃</Text>
            <Text size="13px" padding="0 0 0 6px" margin="0 0 20px 0">게시물의 레이아웃을 선택해주세요.</Text>

            <Grid padding="0 8px">
              
              <LayoutSelector>
                <label className="layout-item">
                  <input onClick={handleChangeLayout} type="radio" name="layout-group" defaultValue="top" defaultChecked={layoutVal.top} />
                    <div className="layout-cont">
                      <div className="layout-guide top">
                      <span className="block-txt">Text</span>
                      <span className="block-img">Image</span>
                      </div>
                      <span className="layout-name">내용 상단</span>
                    </div>
                </label>

                <label className="layout-item">
                  <input onClick={handleChangeLayout} type="radio" name="layout-group" defaultValue="right" defaultChecked={layoutVal.right}/>
                    <div className="layout-cont">
                      <div className="layout-guide right">
                      <span className="block-img">Image</span>
                      <span className="block-txt">Text</span>
                      </div>
                      <span className="layout-name">내용 우측</span>
                    </div>
                </label>

                <label className="layout-item">
                  <input onClick={handleChangeLayout} type="radio" name="layout-group" defaultValue="left" defaultChecked={layoutVal.left}/>
                    <div className="layout-cont">
                      <div className="layout-guide left">
                      <span className="block-txt">Text</span>
                      <span className="block-img">Image</span>
                      </div>
                      <span className="layout-name">내용 좌측</span>
                    </div>
                </label>
              </LayoutSelector>

            </Grid>
          </Grid>

          <Grid bg="white" margin="0 0 10px 0" border="border: 1px solid var(--border-color)" padding="16px">
            <Text bold size="15px" margin="0 0 20px 0">· 내용</Text>
            <Grid>
              <Textarea ref={taRef} _onChange={handleChangeContents} border="0" padding="0 8px" height="170px" placeholder="이곳에 내용을 입력하세요."/>
            </Grid>
          </Grid>

          <Grid height="auto" is_container style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
            <Button disabled={isLoading} _onClick={handleClickWriteBtn} bold size="15px" height="40px" style={{borderRadius: 0}} width="100%" margin="0 auto">
              { isLoading ? <PulseLoader color="#fff" size="5px"/> : '작성하기' }  
            
            </Button>
          </Grid>

        </Grid>
      </WriteArea>
  )
}

const WriteArea = styled.div`
  padding-bottom: 40px;

@media screen and (max-width: 425px) {
  
  .responsive-uploader {
    flex-direction: column;
    height: auto;

    & > div {
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }

    & > label {
      width: 100%;
      order: -1;
    }

  }
}

`

const LayoutSelector = styled.div`
  display: flex;
  justify-content: space-between;

  input[type="radio"] {
    display: none;
  }

  .layout-item {
    text-align: center;
  }

  .layout-guide {
    display: flex;
    justify-content: center;
    width: 80px;
    height: 80px;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid var(--border-color);

    .block-txt,
    .block-img {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      padding: 3px 4px;
      border-radius: 2px;
    }

    .block-img {
      background-color: #dedede;
    }

    .block-txt {
      font-size: 11px;
    }

    &.top {
      flex-direction: column;
    }
  }

  .layout-name {
    cursor: pointer;
    display: block;
    width: 100%;
    color: var(--button-bg);
    margin-top: 10px;
    border-radius: 4px;
    padding: 3px;
    font-size: 13px;
    border: 1px solid var(--button-bg);
  }

  input[type="radio"]:checked {
    & + .layout-cont {
      .layout-guide {
        border-color: var(--button-bg);
      }

      .layout-name {
        color: #fff;
        background-color: var(--button-bg);
      }
    }
  }
`

export default PostWrite
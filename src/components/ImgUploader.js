import React from 'react'
import styled from 'styled-components'

import AddIcon from '@material-ui/icons/Add'
import PulseLoader from "react-spinners/PulseLoader"

const ImgUploader = (props) => {
  const { width, _onChange, isUploading, imageUrl, accept } = props
  const styles = {
    width,
    onChange: _onChange,
    isUploading, 
    imageUrl
  }

  if (imageUrl) {
    return (
      <Uploader {...styles}>
        <div className="ratio-box"></div>
        <input type="file" accept={accept} />
      </Uploader>
    )
  }

  return (
    <Uploader {...styles}>
      <div className="ratio-box">
        <GuideText>
          {isUploading ? <><PulseLoader color="#0095f6" size="5px"/> 업로드 중 </> : <><AddIcon/> 사진 선택</> }
        </GuideText>
        <input type="file" disabled={isUploading} accept={accept}/>
      </div>
    </Uploader>
  )
}

ImgUploader.defaultProps = {
  width: '400px',
  hasFile: false,
  isUploading: false,
  imageUrl: null,
  accept: ''
}

const Uploader = styled.label`
  width: ${props => props.width};
  max-height: 248px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  ${({ isUploading }) => isUploading && 'pointer-events: none;'}

  .ratio-box {
    position: relative;
    padding-bottom: 75%;
    background-image: url("${props => props.imageUrl ? props.imageUrl : props.content_img}");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  input[type='file'] {
    display: none;
  }

  &:hover {
    cursor: pointer;
    border-color: var(--button-bg);

    div {
      color: var(--button-bg);
    }
  }
`

const GuideText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.72;
  font-size: 16px;
`

export default ImgUploader
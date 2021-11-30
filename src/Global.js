import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Bold';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    padding-top: 54px;
    font-size: 14px;
    color: #262626;
    background-color: #fafafa;
    font-family: 'Pretendard-Regular';
  }

  ol, ul, li {
    list-style-type: none;
  }

  img {
    width: 100%;
  }

  input[type="text"] {
    height: 42px;
    padding: 6px;
  }

  button {
    font-family: 'Pretendard-Regular';
    border: 0;
    cursor: pointer;
    background-color: transparent;
  }

  b {
    font-family: 'Pretendard-Bold';
  }

  input,
  textarea {
    outline: none;
    font-family: 'Pretendard-Regular';
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #aaa;
  }
  
  :root {
    --container-size: 614px;
    --border-color: #ececec;
    --button-bg: #0095f6;
  }
`
export default GlobalStyles


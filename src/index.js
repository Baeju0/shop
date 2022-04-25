import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'; //HashRouter도 있는데 Hash는 주소창에 /#/ 추가됨, 더 안전하게 라우팅, #뒤에 적는 것은 서버에 전달X

//redux 사용하기 (값 공유하기 위해)
import {Provider} from 'react-redux';
import { createStore } from 'redux';

let store = createStore(()=> {
  return [{id:0, name : '리덕스 신발', quan: 2},{id:1, name: '리액트 신발', quan: 1}] }); //state 초기값

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

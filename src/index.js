import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'; //HashRouter도 있는데 Hash는 주소창에 /#/ 추가됨, 더 안전하게 라우팅, #뒤에 적는 것은 서버에 전달X

//redux 사용하기 (값 공유하기 위해)
import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { type } from '@testing-library/user-event/dist/type';

//알림창 상태 저장하는 state + reducer 만들기
let alertBase = true;

function reducer2(state = alertBase, action) {
  if(action.type === 'alertClose') {
  return state = false;
  } else {
  return state
  }
}

let defaultState = [
  {id:0, name : '리덕스 신발', quan: 2},
  {id:1, name: '리액트 신발', quan: 1}]; //state 초기값


// redux에서는 state 데이터의 수정하는 방법을 미리 정의함(state 데이터 관리기능)-Cart수량
// ↑의 내용이 reducer!! createStore()안에 저장하는 듯, 아무 일 없으면 그냥 초기값 그대로 return
// reducer는 그냥 수정된 state를 퉤! 뱉는 함수!
function reducer(state = defaultState, action) {
  if( action.type === '항목추가') {
      let copy = [...state];

      // dispatch해서 데이터 전송하고 전송한 데이터를 사용하려면 action.payload
      // reducer의 액션 파라미터는 dispatch()할 때 보낸 object임
      copy.push(action.payload);
      return copy
  }

   //defaultState자리는 default parameter 문법
  else if ( action.type === '수량증가'){
    let copy = [...state];
    copy[action.payload].quan++;
    return copy

  } if ( action.type === '수량감소'){
    let copy = [...state];
    if (copy[0].quan > 0)
    copy[0].quan--;
    return copy
  }

   else {
    return state
  }
}
// 데이터 수정하는 법. if문으로 바뀔 때 바뀌는 state 적용, 아닐 때 그냥 기존 state




// Redux 왜 사용? 복잡한 props 전송 필요할 필요가 없다!
// reducer 더 만들었으면 combineReducers({}) 사용하기(import 해오기)
let store = createStore(combineReducers({reducer, reducer2}));


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

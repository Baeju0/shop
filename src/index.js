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
  {id:0, name : 'White and Black', quan: 0}
  ,{id:1, name: '리액트 신발', quan: 1}
]; //state 초기값


// redux에서는 state 데이터의 수정하는 방법을 미리 정의함(state 데이터 관리기능)-Cart수량
// ↑의 내용이 reducer!! createStore()안에 저장하는 듯, 아무 일 없으면 그냥 초기값 그대로 return
// reducer는 그냥 수정된 state를 퉤! 뱉는 함수!
function reducer(state = defaultState, action) {
  if( action.type === '항목추가') {

      // state 안에 id : 액션.데이터인 항목이 있는가?
      // findIndex : Array안에서 원하는 데이터 찾아주는 js함수
      // 파라미터 함수 넣어주고 (a), 리턴하면서 array 안에 있던 a라는 데이터와 === ??? 와 일치하는가?
      // 값이 맞다면 어레이 몇 번 째인지 결과값이 나옴
      let found = state.findIndex((a)=>{ return a.id === action.payload.id});

      // 상품 추가된 게 있을 때, 중복으로 항목 생성하지 않고 수량만 증가
      if( found >= 0 ) {
        let copy = [...state];
        copy[found].quan++;

      } else {
      let copy = [...state];
      // dispatch해서 데이터 전송하고 전송한 데이터를 사용하려면 action.payload
      // reducer의 액션 파라미터는 dispatch()할 때 보낸 object임
      copy.push(action.payload);
      return copy
      }

   //defaultState자리는 default parameter 문법
    } else if ( action.type === '수량증가'){
    let copy = [...state];
    copy[action.payload].quan++;
    return copy

  } if ( action.type === '수량감소'){
    let copy = [...state];
    if (copy[action.payload].quan > 0)
    copy[action.payload].quan--;
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


// *새로운 상품 수량 추가 버그 -> 해결 -> 한줄 알았는데 더 이상해짐 다시
// *주문하기 버튼 옆에 수량 input 생성
// *상품 사이즈 저장 or 상품 사이즈 선택
// *장바구니 항목 삭제
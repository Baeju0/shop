import axios from "axios";
import {React, useContext, useEffect, useState} from "react"
import { useCol } from "react-bootstrap/esm/Col";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import './Detail.scss';
import { Nav } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";

// useContext 사용하기 위해 App.js에서 가져오기
import {재고context} from './App.js';

let 박스 = styled.div`
    padding: 20px
`;

let 제목 = styled.h4`
    font-size: 25px;
    color : ${ props => props.색상 }
`;

// CSS를 미리 입혀놓은 컴포넌트 생성해서 CSS스타일링하기! (styled-components) 물론 취향차이로 사용ㅇ

function Detail(props) {

    let [alert, alert변경] = useState(true);
    // let [inputData, inputData변경] = useState('');
    let 재고 = useContext(재고context);

    // 몇 번째 버튼을 눌렀는지 저장할 state 만들기(tab 기능)
    let [tab, setTab] = useState(0);
    let [스위치, 스위치클릭] = useState(false);


    // 컴포넌트 로드 시 ajax로 데이터 가져오고 싶을 때!
    // useEffect(()=> {
    //     axios.get()
    // })

    useEffect(()=> {
        setTimeout(()=>{
          alert변경(false)}, 2000);
    },[]);

    let { id } = useParams();
    let 상품상세 = props.shoes.find(function(상품){
        return 상품.id == id
    });
    // 1. find()는 array 뒤에 붙일 수 있으며, 안에 콜백함수가 들어감
    // 2. 콜백함수 내의 파라미터는 (상품이라고 적어 놓은 거) array 안에 있던 하나하나의 데이터를 의미
    // 3. return 오른쪽엔 조건식을 적을 수 있습니다. 이게 참인 데이터만 새로운 변수에 저장해줍니다.
    // 4. 조건식엔 그리고 그걸 현재 URL의 /:id에 적힌 값과 상품의 영구번호 (상품.id)가 같은지 비교하고 있는 겁니다.
    // 근데 어차피 Ajax로 요청해서 받아옴~!!!


    let history = useHistory(); //방문기록 담은 오브젝트(말그대로 히스토리)

    return(
    <div className="container">
         <박스>
        <제목 className = "red">Detail</제목>
         </박스>

        {/* {inputData}
         <input onChange={(e)=>{
             inputData변경(e.target.value)
         }}/>  
         update 확인용!!*/}
         
         {alert ? <div className="my-alert2">
             <p>재고가 얼마 남지 않았습니다!!!</p>
         </div> : null }
         
         {/* ↑ style-component를 사용해본 곳.,. */}

        <div className="row">
         <div className="col-md-6">
        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5">{상품상세.title}</h4>
        <p>{상품상세.content}</p>
        <p>{상품상세.price}원</p>

         <Info 재고={props.재고}></Info>

         {/* 주문하기 버튼 누를때 재고-1 하기 */}
        <button className="btn btn-danger" onClick={()=> {
            props.재고변경([9,10,11])
        }}>주문하기</button> 

        <button className="btn btn-danger" onClick={()=>{
            history.goBack();
            // history.push('/') 이 경로로 이동시켜주세요! 하면 이동시켜줌
        }}>뒤로가기</button> 
      </div>
    </div>

    {/* tab기능 만들기
         1.UI상태를 true/false state로 저장
         2.state에 따라 UI 보이고 안 보이고 설정! */}
        
        <Nav variant="tabs" defaultActiveKey="link-0">
         <Nav.Item>
        <Nav.Link eventKey="link-0" onClick={()=>{ 스위치클릭(false); setTab(0) }}>기본 탭</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="link-1" onClick={()=>{ 스위치클릭(false); setTab(1) }}>첫번째 탭</Nav.Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="link-2" onClick={()=>{ 스위치클릭(false); setTab(2) }}>두번째 탭</Nav.Link>
         </Nav.Item>
        </Nav>


         {/* CSSTransition은 yarn add react-transition-group 설치해서 사용하는 애니메이션 라이브러리 */}
         {/* 애니메이션 효과를 적용하고 싶은 곳 감싸기 */}

         {/* in, classNames, timeout속성 넣기 */}
         {/* in은 애니메이션 키는 스위치! true면 동작! 이것 또한 변수나 state로 저장해서 사용해야됨 */}
         {/* classNames을 css로 데려가서 애니메이션 만들기 */}
         <CSSTransition in={스위치} classNames="hello" timeout={500}>

         {/* Detail 컴포넌트에 tab State가 있기 때문에 props 전송해주기 */}
          <TabContent tab={tab} 스위치클릭={스위치클릭}/>
         
         </CSSTransition>

    </div>
     )
  }
  
  function TabContent(props) {

    useEffect(()=> {
        props.스위치클릭(true);
    })
         
    // 두개의 조건이 있을 때 삼항 연산자보단 if문으로 사용하기
      if(props.tab === 0) {
          return <div>0번째 내용!</div>
        } else if(props.tab === 1) {
          return <div>1번째 내용!</div>
        } else if(props.tab === 2) {
          return <div>2번째 내용!</div>
      }
  }

  function Info(props) {
      return(
          <p>재고 : {props.재고[0]}</p>
      )
  }

  export default Detail;
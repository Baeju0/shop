/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import logo from './logo.svg';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import React, { useContext, useState } from 'react';
import sang from './data';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import data from './data';
import reactRouterDom from 'react-router-dom';
import Cart from './Cart.js';

// 다른 컴포넌트 파일(js)에도 사용하기 위해 export로 내보내기
export let 재고context = React.createContext(); //1. createContext는 같은 변수값을 공유할 범위생성


function App() {

  let [shoes, shoes변경] = useState(sang);
  let [loading, loading변경] = useState(true);

  let [재고,재고변경] = useState([10,11,12]);
  let [dataPage, setDataPage] = useState(2);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand as={Link} to="/">Shoes Sale</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/detail/1">Detail</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      </Navbar.Collapse>
      </Container>
      </Navbar>

     
     <Switch>

      <Route exact path="/">
      <div className='bae'>
        <h1>신발 파는 곳!</h1>
        <p>여러 종류의 신발을 판매하는 쇼핑몰 입니다</p>
        <Button variant="primary">Show More</Button>{' '}
        </div>

        <div className='container'>
        
        {/* {2. 값 공유를 원하는 HTML들을 범위.Provider로 감싸기. value={공유하고 싶은 데이터 입력} */}
        <재고context.Provider value={재고}>
        <div className='row'>
          {shoes.map(function(상품, i) {
            return(
              <Sang shoes={shoes[i]} i={i} />
            )
          })}
        </div>
        </재고context.Provider>


          {/* 마지막 상품일 때 더보기 버튼 없애기 */}
        <button className='btn btn-primary' onClick={()=>{
          setDataPage(dataPage + 1);
          // 서버에 데이터 보내고 싶을 때!
          // axios.post('서버URL',{data});

          // 불러올 동안 로딩중이라는 UI 띄우기
          {loading? <div><p>로딩중</p></div> : null}
          
          axios.get(`https://codingapple1.github.io/shop/data${dataPage}.json`)
          .then((result)=> {
            loading변경(false)
            shoes변경([...shoes, ...result.data])
          })
          .catch(()=>{
            loading변경(false)
            alert('추가상품이 없습니다!')
            console.log('실패...')
          })

        }}>더보기</button>

        </div>
      </Route>

      <Route path="/detail/:id">
        {/* :ㅇㅇ 아무문자가 오든간에 이 페이지를 보여주세요! 파라미터 문법 (: 뒤 맘대로 작명, 여러개 사용 가능)  */}
          <재고context.Provider value={재고}>
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </재고context.Provider>
      </Route>
      
      <Route path="/cart">
        <Cart></Cart>
      </Route>

      <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여주세요!</div>
          {/* detail이랑 같이 나옴, 근데 Switch함수 쓰면 스위치처럼 하나가 켜지면 다른 하나만 켜지고 그런 기능 */}
          {/* 매치되는 <Route>들을 전부 보여주지 말고 한번에 하나만 보여주세요! -><Switch>기능 */}
      </Route>

    </Switch>

      {/* <Route path="/어쩌구" component={Modal}></Route> */}

      {/* 상품 레이아웃 만들기(웹에선 가로 3개 진열, 앱에선 세로 1열) */}
        {/* <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <img src="https://codingapple1.github.io/shop/shoes1.jpg"/>
              <h4>{shoes[0].title}</h4>
              <p>{shoes[0].content}</p>
              <p>{shoes[0].price}</p>
              </div>
            <div className='col-md-4'>
              <img src="https://codingapple1.github.io/shop/shoes2.jpg"/>
              <h4>상품명</h4>
              <p>상품설명 & 가격</p>
              </div>
            <div className='col-md-4'>
              <img src="https://codingapple1.github.io/shop/shoes3.jpg"/>
              <h4>상품명</h4>
              <p>상품설명 & 가격</p>
              </div>
          </div>
        </div> */}

   
    
    </div>
  );
}




function Sang(props) {

  let 재고 = useContext(재고context); //3. useContext()로 공유된 값 사용하기 (props없이 state 사용하기, 그대신 여러번 자식 컴포넌트에 전송해야될 경우에 편함)

  return(
        <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width='100%;'/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.content}</p>
          <p>{props.shoes.price}</p>
          {/* <p>{재고[props.i]}</p> */}
          <Test/>
          
        </div>
  )       
}

// 또 하위 컴포넌트에서 사용할 경우 Test
function Test() {
  let 재고 = useContext(재고context);
  return <p> 재고 : {재고[0]} </p>
}

export default App;

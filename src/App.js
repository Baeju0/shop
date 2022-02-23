import logo from './logo.svg';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import sang from './data';

import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';

function App() {

  let [shoes, shoes변경] = useState(sang);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Shoes Sale</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
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
        <h1>안녕 여긴 신발 파는 곳</h1>
        <p>사든가 말든가 어쩌구저쩍ㅈ궂ㄱ냠냠</p>
        <Button variant="primary">Show More</Button>{' '}
        </div>

        <div className='container'>
        <div className='row'>
          {shoes.map(function(상품, i) {
            return(
              <Sang shoes={shoes[i]} i={i} />
            )
          })}
        </div>
        </div>
      </Route>

      <Route path="/detail/:id">
        {/* :ㅇㅇ 아무문자가 오든간에 이 페이지를 보여주세요! 파라미터 문법 (: 뒤 맘대로 작명, 여러개 사용 가능)  */}
          <Detail shoes={shoes}/>
      </Route>

      <Route path="/:id">
          <div>아무거나 적었을 때 이거 보여쥬세요</div>
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
  return(
        <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width='100%;'/>
          <h4>{props.shoes.title}</h4>
          <p>{props.shoes.content}</p>
          <p>{props.shoes.price}</p>
        </div>
  )
        
}

export default App;

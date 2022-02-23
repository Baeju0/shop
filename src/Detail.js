import {React, useEffect, useState} from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import './Detail.scss';

let 박스 = styled.div`
    padding: 20px
`;

let 제목 = styled.h4`
    font-size: 25px;
    color : ${ props => props.색상 }
`;

// CSS를 미리 입혀놓은 컴포넌트 생성해서 CSS스타일링하기! (styled-components) 물론 취향차이로 사용ㅇ

function Detail(props) {

    let [재고, 재고변경] = useState(true);
    // let [inputData, inputData변경] = useState('');

    useEffect(()=> {
        setTimeout(()=>{
          재고변경(false)}, 2000);
    },[]);

    let { id } = useParams();
    let 상품상세 = props.shoes.find(function(상품){
        return 상품.id == id
    });
    // 1. find()는 array 뒤에 붙일 수 있으며, 안에 콜백함수가 들어감
    // 2. 콜백함수 내의 파라미터는 (상품이라고 적어 놓은 거) array 안에 있던 하나하나의 데이터를 의미
    // 3. return 오른쪽엔 조건식을 적을 수 있습니다. 이게 참인 데이터만 새로운 변수에 저장해줍니다.
    // 4. 조건식엔 그리고 그걸 현재 URL의 /:id에 적힌 값과 상품의 영구번호 (상품.id)가 같은지 비교하고 있는 겁니다.
    // 근데 어차피 Ajax로 요청해서 받아옴 킼ㅋㅋ


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
         
         {재고 ? <div className="my-alert2">
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
        <button className="btn btn-danger">주문하기</button> 
        <button className="btn btn-danger" onClick={()=>{
            history.goBack();
            // history.push('/') 이 경로로 이동시켜주세요! 하면 이동시켜줌
        }}>뒤로가기</button> 
      </div>
    </div>
  </div> )
  }

  export default Detail;
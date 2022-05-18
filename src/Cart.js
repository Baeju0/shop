import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

function Cart(props) {
    return(
        <div>
        <Table>
            <thead>
                <tr>
                    <th>상품ID</th>
                    <th>상품명</th>
                    <th>수량</th>
                </tr>
            </thead>
        <tbody>
            {
                props.state.map((a,i)=>{
                    return (
                        <tr key={i}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.quan}</td>

                            {/* 수량 버튼 만들기 */}
                            {/* Redux 쓰는 이유2 */}
                            {/* reudcer에 데이터 수정 요청(ex.수량증가)할 때는 props.dispatch({type:'-'}) 사용 */}
                            {/* dispatch()로 수정 요청을 할 때 데이터를 보낼 수도 있음 dispatch({type:'ㅁㅁ', payload: 보낼데이터}) */}
                            {/* ({type ~~~})여기는 action 파라미터임, 보낸 자료는 액션 파라미터에 저장되어있음!!(index) */}
                            <td><button onClick={()=> { props.dispatch({ type : '수량증가', payload : {name : 'bae'}})}}>+</button></td>
                            <td><button onClick={()=> { props.dispatch({ type : '수량감소'})}}>-</button></td>
                        </tr>
                    )
                })
            }
                    {/* <tr>
                    <td>{props.state[0].name}</td> */}
                     {/* index.js에 있는 '신발' 이라는 값 표출 */}
                    {/* <td>name</td>
                    <td>테이블</td>
                    <td>Table cell</td>
                    </tr> */}
                </tbody>
            </Table>
            { props.alertOpen === true?
            <div className="my-alert2">
                <p>지금 구매하시면 50% 할인!!</p>

                {/* 버튼 누르면 닫기 만들기 - 평소처럼 하면xxx */}
                {/* index.js에서 데이터 수정하는 방법을 만들고 dispatch사용 */}
                {/* <button onClick={()=>{
                    props.alertOpen(false)
                }}>닫기</button> */}

                {/* 근데 이런 곳에서 redux store에 저장하지 말기, redux는 모든 데이터 관리할 때 사용 */}
                <button onClick={()=>{
                    props.dispatch({type : 'alertClose'})}}>닫기
                </button>
            </div> : null }
        </div>
    )
}

// 컴포넌트에서 index.js store에 있는 state 사용하기
// store 안에 있던 데이터를 다 가져와서 props처럼 만들어주는 함수
// reducer 여러 개 합치면 store 데이터 뽑아쓸 때 오류남
// store 데이터는 { reducer:0, reducer2:0 } 이렇게 생김
function hamsu(state) {
    console.log(state);
    return {
        // store 데이터에서 뽑아야되기 때문에 ↓state.reducer라고 써야됨
        state : state.reducer,
        alertOpen : state.reducer2 //UI 모달창
    }
}
export default connect(hamsu)(Cart)

// export default Cart;
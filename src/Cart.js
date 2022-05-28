import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {

    // 1. 함수나 오브젝트는 선언해서 사용하기
    // 2. 애니메이션(css - transform속성 사용하기)


    // 맨 밑에 작성되어 있는 '컴포넌트에서 index.js store에 있는 state 사용하기' 부분 

    // useSelector()
    // redux에 있던 state 꺼내쓰는 방법! 굳이 props를 작성하지 않아도 됨
    // useSelector()안에 콜백함수 작성하면 redux state가 남는데 이것을 변수에 저장해서 사용
    // 콜백함수 안에는 파라미터 하나 입력 가능한데 이건 자동으로 store가 됨
    let state = useSelector((state) => state);
    // 그렇기 때문에 useSelector((state) => state.reducer); 로 하면 state.reducer만 출력 가능
    // console.log(state.reducer)

    // useDispatch()
    // dispatch하는 더 쉬운 방법
    // 굳이 props 안 쓰고 dispatch만 쓰기 가능(밑에 onClick부분)
    let dispatch = useDispatch();

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
                state.reducer.map((a,i)=>{
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
                            <td><button onClick={()=> { dispatch({ type : '수량증가', payload : a.id })}}>+</button></td>
                            <td><button onClick={()=> { dispatch({ type : '수량감소', payload : a.id })}}>-</button></td>
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
            <Parent 이름="쥬용" 나이="22"/>
        </div>
    )
}

// 컴포넌트에서 index.js store에 있는 state 사용하기
// store 안에 있던 데이터를 다 가져와서 props처럼 만들어주는 함수
// reducer 여러 개 합치면 store 데이터 뽑아쓸 때 오류남
// store 데이터는 { reducer:0, reducer2:0 } 이렇게 생김
// function hamsu(state) {
//     console.log(state);
//     return {
//         // store 데이터에서 뽑아야되기 때문에 ↓state.reducer라고 써야됨
//         state : state.reducer,
//         alertOpen : state.reducer2 //UI 모달창
//     }
// }
// export default connect(hamsu)(Cart)


// 예시용 컴포넌트임, memo
// 하나의 컴포넌트만 변경했는데, 둘 다 재렌더링이 되는 것을 막기 위해 사용
// react에서의 {memo} import 하기
// 사용하고 싶은 컴포넌트를 memo()로 감싸기
// 감싸게 되면 그 컴포넌트와 관련된 props의 정보가 변경될때만 재렌더링 됨

function Parent(props){
    return (
        <div>
            <Child1 이름={props.이름}></Child1>
            <Child2 이름={props.나이}></Child2>
        </div>
    )
}

function Child1(props){
    useEffect(()=> { console.log('1번 렌더링됨!')});
    return <div>첫 번째</div>
}

// 단점은 기존 props와 바뀐 props를 비교한 후 컴포넌트를 업뎃할지 말지 결정함>> 자주 바뀌는 데이터면 용량 과다 사용!!!
let Child2 = memo(function(){
    useEffect(()=> { console.log('2번 렌더링됨!')});
    return <div>두 번째</div>
});

export default Cart;
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
                            <td>테이블</td>
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
        </div>
    )
}

// 컴포넌트에서 index.js store에 있는 state 사용하기
// store 안에 있던 데이터를 다 가져와서 props처럼 만들어주는 함수
function hamsu(state) {
    return {
        state : state
    }
}
export default connect(hamsu)(Cart)

// export default Cart;
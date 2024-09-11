import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginFormPage(props) {

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        e.target.id.value=""
        e.target.pw.value=""
        fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((data) => {
            console.log(data)
            //로그인성공시 사용자 정보를 넘겨받음
            // role값에 따라 화면을 달리 처리
            if(data.code != "ok"){ //로그인실패하면 메시지출력
                alert(data.message)
                return
            }
            if(data.data.role=="user"){
                //주문화면으로 이동.경로끝에 테이블번호 추가.
                navigate("/order/"+data.data.tableNo);
                return
            }
            if(data.data.role=="admin"){
                //관리메인화면으로 이동
                navigate("/admin/main");
                return
            }
        })

    }
    return (
        <>
         <h1>로그인폼</h1>   
         <form onSubmit={handleSubmit}>
            <label>
                회원 아이디 : 
                <input name='id'></input>
            </label><br></br>
            <label>
                회원 비밀번호 : 
                <input type='password' name='pw'></input>
            </label><br></br>
            <input type='submit' value="로그인"></input>
         </form>
        </>
    );
}

export default LoginFormPage;
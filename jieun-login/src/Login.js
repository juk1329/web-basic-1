import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import { darken, lighten } from 'polished';

// (dbg) example info
const info = [{
    id: 'id',
    password: 'password'
},
{
    id: 'jieun',
    password: 'kwon'
},
{
    id: 'a',
    password: 'b'
}];

const LoginBlock = styled.div`
    width: 200px;

    position: relative; 
    background: white;
    border-radius: 16px; // 모서리 둥굴게
    box-shadow: 0 0 8px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    margin: 0 auto; // 페이지 중앙

    padding: 20px;
    margin-top: 10px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column; // 플렉스 컨테이너 내 아이템 배치 주축 및 방향
`;

const Button = styled.button`
    border: none;
    width: 30%;
    padding: 3px;
    margin-top:10px;
    // margin: 10px 5px 0px 5px;
    background: ${props=>props.color || '#38d9a9'};
    &:hover{
        background: ${props=>lighten(0.1, props.color || '#38d9a9')};
    }
    &:active{
        background: ${props=>darken(0.1, props.color || '#38d9a9')};
    }
`;

const ButtonBar=styled.div`
    // border:solid black;
    // display: flex;
    // // grid-template-columns: 1fr 1fr;
    // margin: 0;
    // padding: 0;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

// info 배열에 id, password가 존재하면 true
// 없으면 false 반환
function isValid({ id, password }) {
    const index = info.find((element) => element.id === id);
    if (index && index.password === password) return true;
    else return false;
}

function Login() {
    // 입력
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    });
    // 제출한 id, password
    const [submits, setSubmits] = useState({
        id: '',
        password: ''
    });
    // 제출한 id, password가 info 배열에 존재하면 true
    const [valid, setValid] = useState(false);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 로그인 버튼 누르면 그때까지 입력받은 id, password를 제출, validity check
    const onSubmit = () => {
        setSubmits({ id: inputs.id, password: inputs.password });
        setValid(isValid(inputs));
        setInputs({ id: '', password: '' });
    };

    return (
        <>
            <LoginBlock>
                <Input name="id" placeholder="ID" onChange={onChange} value={inputs.id} />
                <Input name="password" placeholder="PASSWORD" onChange={onChange} value={inputs.password} />
                <ButtonBar>
                <Button color='pink' style={{marginRight:'40%'}}>가입</Button>
                <Button onClick={onSubmit}>로그인</Button>
                </ButtonBar>
            </LoginBlock>

            {/*dbg*/}
            <div style={{ margin: '0 auto', width: '200px'}}>
                <p>
                    <div><b>ID:</b> {submits.id}</div>
                    <div><b>PASSWORD:</b> {submits.password}</div>
                    <div style={{
                        color: valid ? "green" :
                            "red",
                        fontSize: 'xx-large'
                    }}>{valid ? 'valid' : 'Invalid'}</div>
                </p>

                <p style={{ color: "blue" }}>
                    <div><b>info 배열: id password</b></div>
                    <div>a b</div>
                    <div>jieun kwon</div>
                    <div>id password</div>
                </p>
            </div>
        </>
    )
}

export default Login;
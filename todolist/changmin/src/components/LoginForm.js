import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAccountCurrent, useAccountState } from "./AccountContext";

const LoginFormBlock = styled.form`
  flex: 1;
  text-align: center;
  font-size: 30px;
  color: #eee;

  h1 {
    font-size: 50px;
    color: #9ce;
    margin: 50px;
  }

  div {
    padding: 20px;

    display: flex;
    flex-direction: row;
  }

  button {
    background: #3a7;
    &:hover {
      background: #5c9;
    }
    /* 마우스를 올렸을 때 색 */
    &:active {
      background: #4b8;
    }
    /* 클릭했을 때 색 */

    cursor: pointer;
    font-size: 30px;
    font-weight: bold;

    padding: 5px 20px;
    margin: 30px;

    border-radius: 20px;
    border: none;
    outline: none;

    transition: 0.2s;
  }
`;

const Input = styled.input`
  color: #eee;
  background: rgba(0, 0, 0, 0);
  padding: 4px;
  margin: 0 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
`;

function LoginForm() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs; // 입력받은 username / password
  const account = useAccountCurrent(); // 현재 로그인된 계정
  const accounts = useAccountState(); // 현재 등록되어 있는 계정들
  const usernameInput = useRef(); // Username 입력 focus 위해 사용
  const passwordInput = useRef(); // Password 입력 focus 위해 사용
  const navigate = useNavigate(); // 로그인 성공 후 navigate 위해 사용

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Username을 입력해주세요.");
      usernameInput.current.focus();
      return;
    }
    if (!password) {
      alert("Password를 입력해주세요.");
      passwordInput.current.focus();
      return;
    }

    account.current = accounts.find(
      (e) => e.username === username && e.password === password
    );
    if (!account.current) {
      alert("Username 또는 Password가 올바르지 않습니다.");

      // password input field 초기화
      setInputs({ ...inputs, password: "" });

      // password field에 focus
      passwordInput.current.focus();
    } else {
      alert(`성공적으로 로그인되었습니다. 안녕하세요, ${username}님!`);
      navigate("/");
    }
  };

  const onLogout = () => {
    account.current = undefined;

    alert("로그아웃되었습니다.");
    navigate("/");
  };

  if (!!account.current) {
    // 로그인 된 화면
    return (
      <LoginFormBlock>
        <h1>안녕하세요, {account.current.username}님!</h1>
        <button onClick={onLogout}>로그아웃</button>
      </LoginFormBlock>
    );
  }

  return (
    <LoginFormBlock>
      <h1>로그인</h1>
      <div>
        Username:{" "}
        <Input
          autoFocus
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Username"
          ref={usernameInput}
        />
      </div>
      <div>
        Password:{" "}
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          ref={passwordInput}
        />
      </div>
      <button onClick={onSubmit}>로그인</button>
    </LoginFormBlock>
  );
}

export default React.memo(LoginForm);

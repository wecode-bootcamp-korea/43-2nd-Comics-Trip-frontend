import React from 'react';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from '../../components/OAuth';

const Login = props => {
  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleClose = () => {
    props.setIsModalOpen(false);
  };

  return (
    <LoginForm>
      <LoginWrapper>
        <MainLogo alt="메인 로고" src="./images/Login/ct_logo.png" />
        <LoginDescription>
          간편하게 로그인하고 다양한 서비스를 이용하세요.
        </LoginDescription>
        <LoginButton onClick={loginKakao}>
          <KakaoLogo
            alt="카카오 로고"
            src="//s.zigbang.com/zigbang-account/prod/_next/static/img_content_login_kakako_28x28_nor-6aed346c65fff83c67553d9bc21a0e1b.png"
          />
          카카오톡으로 시작
        </LoginButton>
        <LoginCloseWrapper>
          <CloseButton onClick={handleClose}>닫기</CloseButton>
        </LoginCloseWrapper>
      </LoginWrapper>
    </LoginForm>
  );
};

const LoginForm = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  max-width: 500px;
  min-height: 500px;
  margin: 0 auto;
  border: 2px solid #d2d2d2;
  margin-top: 112px;
  z-index: 1;
  background-color: white;
`;

const LoginWrapper = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const MainLogo = styled.img`
  display: flex;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const LoginCloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const CloseButton = styled.button`
  position: absolute;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
`;

const LoginDescription = styled.p`
  display: flex;
  margin-bottom: 20px;
  padding 10px;
  font-size: 18px;
`;

const KakaoLogo = styled.img`
  width: 28px;
  height: 27px;
  margin-right: 5px;
`;

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 55px;
  margin: 0 auto;
  background-color: rgb(254, 229, 0);
  border-radius: 25px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default Login;

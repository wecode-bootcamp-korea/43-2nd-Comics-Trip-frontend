import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIS } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { REST_API_KEY, REDIRECT_URI } from '../../components/OAuth';

const KakaoAuth = () => {
  const navigate = useNavigate();
  const kakaoCode = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${kakaoCode}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        fetch(APIS.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: data.access_token,
          },
        })
          .then(res => res.json())
          .then(loginData => {
            if (loginData) {
              localStorage.setItem('TOKEN', loginData.accessToken);
              navigate('/');
            } else {
              alert('다시 한번 확인해주세요.');
            }
          });
      });
  }, []);

  return (
    <Spinner>
      <FontAwesomeIcon icon={faSpinner} />
    </Spinner>
  );
};

const rotation = keyframes`
from{
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`;
const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d1d5d9;
  width: 100vw;
  height: 100vh;
  font-size: 80px;
  animation: ${rotation} 2s linear infinite;
`;

export default KakaoAuth;

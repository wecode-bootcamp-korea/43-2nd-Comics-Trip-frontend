import styled, { keyframes } from 'styled-components';

export const up = keyframes`
0% {transform: translateY(0)};
100% {transform: translateY(-12px)};
`;

export const GrayWrapper = styled.div`
  padding-bottom: 40px;
  background-color: #f3f4f5;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: center;
  width: 80%;
  height: 45px;
  margin: 0 auto;
`;

export const WrapperWithBorder = styled(Wrapper)`
  width: 100%;
  border-bottom: 1px solid #d1d5d9;
  border-top: 1px solid #d1d5d9;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;

export const Category = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 30px;
  font-size: 16px;
  text-align: center;
  color: #808991;
  font-weight: 400;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid #40474d;
    font-weight: 700;
    color: #40474d;
  }
`;

export const AllCategory = styled(Category)`
  border-bottom: 2px solid #40474d;
  font-weight: 700;
  color: #40474d;
`;

export const Form = styled.form`
  padding: 0 12px;
  border-radius: 3px;
  border: 1px solid #d1d5d9;
  background-color: #fff;
  color: #9ea7ad;
`;

export const Input = styled.input`
  width: 550px;
  height: 30px;
  margin-left: 7px;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #9ea7ad;
  }
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 3px;
  margin-left: 12px;
  border: 0;
  background-color: transparent;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export const Section = styled.section`
  min-width: 835px;
  max-width: 80%;
  margin: 40px auto 100px auto;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #40474d;
`;

export const OrderList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //height: 224px;
  box-shadow: -35px 70px 85px -80px #d1d5d9;
`;

export const ImgLi = styled.li`
  position: relative;
  width: 137.5px;
  height: 200px;
  margin: 40px 12px 0 12px;

  &:hover {
    cursor: pointer;
    animation: ${up} 0.5s linear forwards;
  }
`;

export const Count = styled.div`
  position: absolute;
  top: 83%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 45%;
  height: 26px;
  background-color: black;
  outline: 1px solid #fff;
  outline-offset: -3px;
  border-radius: 50px;
  font-size: 13px;
  text-align: center;
  line-height: 26px;
  color: #fff;
`;

export const CountDownWrap = styled.div`
  position: absolute;
  top: 0;
  width: 137.5px;
  height: 200px;
  display: none;
`;

export const RentImgLi = styled(ImgLi)`
  &:hover {
    ${CountDownWrap} {
      display: block;
      background-color: #444444cf;
    }
  }
`;

export const Img = styled.img`
  width: 137.5px;
  height: 200px;
  object-fit: cover;
`;

export const Sequence = styled.span`
  position: absolute;
  top: 9px;
  left: 9px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #38b5ff;
  border-radius: 50px;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
`;

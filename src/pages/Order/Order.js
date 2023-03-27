import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);
  const tokenOrder = localStorage.getItem('token', orderList.token);
  const orderArray = orderList[0];

  useEffect(() => {
    fetch('/data/orderData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setOrderList(data);
      });
  }, []);

  const [isChecked, setIsChecked] = useState('');

  const handleChecked = e => {
    if (isChecked === '') {
      setIsChecked(true);
    } else if (isChecked === false) {
      setIsChecked(true);
    } else {
      setIsChecked('');
    }
  };

  const checkPart =
    orderArray &&
    orderArray.part.map(({ id }) => {
      return { ...orderInfo, id };
    });

  const onclickToBuy = () => {
    isChecked && tokenOrder
      ? fetch(
          ('주소',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: tokenOrder,
            },
            body: JSON.stringify({
              id: orderArray.id,
              totalPrice:
                orderArray?.price && orderArray.price * orderList.length,
              part: checkPart,
            }),
          })
        )
          .then(res => res.json())
          .then(data => setOrderInfo(data))
      : setIsChecked(false);
  };

  const MoreList = () => {
    if (openList === false) {
      setOpenList(true);
    } else setOpenList(false);
  };

  return (
    <Section>
      <OrderListWrap>
        <Title>주문 목록</Title>
        <span>{orderArray?.part && orderArray.part.length}권</span>
        <ul>
          {orderArray?.part &&
            orderArray.part
              .slice(0, 5)
              .map(({ id, images, writer, price, title }) => {
                return (
                  <li key={id}>
                    <OrderItemPart>
                      <PartInfo>
                        <PartImg>{images}</PartImg>
                        <div>
                          <OrderBookTitle>
                            {title}
                            {id}권
                          </OrderBookTitle>
                          <Author>{writer}</Author>
                        </div>
                      </PartInfo>
                      <OrderBookPrice>
                        {orderArray.price.toLocaleString()}원
                      </OrderBookPrice>
                    </OrderItemPart>
                  </li>
                );
              })}
          {openList &&
            orderArray.part
              .slice(5)
              .map(({ id, images, writer, price, title }) => {
                return (
                  <li key={id}>
                    <OrderItemPart>
                      <PartInfo>
                        <PartImg>{images}</PartImg>
                        <div>
                          <OrderBookTitle>
                            {title}
                            {id}권
                          </OrderBookTitle>
                          <Author>{writer}</Author>
                        </div>
                      </PartInfo>
                      <OrderBookPrice>
                        {orderArray.price.toLocaleString()}원
                      </OrderBookPrice>
                    </OrderItemPart>
                  </li>
                );
              })}
        </ul>
        {!openList && orderArray?.part && (
          <SeeMoreList onClick={MoreList}>
            {orderArray.part.length - 5}권 더보기
          </SeeMoreList>
        )}
        {openList && <SeeMoreList onClick={MoreList}>접기</SeeMoreList>}
      </OrderListWrap>
      <OrderInfoWrap>
        <Title>결제 정보</Title>
        <OrderTotalPriceInfo>
          <div>총 결제가격</div>
          <OrderTotalPrice>
            {orderArray?.price &&
              (orderArray.price * orderArray.part.length).toLocaleString()}
          </OrderTotalPrice>
          <div>원</div>
        </OrderTotalPriceInfo>
        <InputLabel checked={isChecked}>
          <AgreeToBuy
            checked={isChecked}
            onChange={handleChecked}
            type="checkbox"
          />
          <Agree value={isChecked}>
            상품, 가격, 할인 정보 등을 확인하였으며 <br />
            구매에 동의합니다.
          </Agree>
        </InputLabel>

        <ButtonToBuy onClick={onclickToBuy} value={isChecked}>
          결제하기
        </ButtonToBuy>
      </OrderInfoWrap>
    </Section>
  );
};

const Agree = styled.span`
cursor:pointer;
animation: ${props => (props.value === false ? 'shake 0.1s' : 'none')};
animation-iteration-count: 3;
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }`;

const SeeMoreList = styled.div`
  border: 1px solid #dedede;
  border-radius: 8px;
  text-align: center;
  color: #646464;
  font-size: 14px;
  padding: 13px;
  cursor: pointer;
`;
const Author = styled.div`
  margin: 10px 0;
  font-size: 13px;
`;
const AgreeToBuy = styled.input`
  margin: 0 5px;
`;
const InputLabel = styled.label`
  display: flex;
  margin: 10px 0;
  color: ${props => (props.checked === false ? 'red' : '')};
`;
const ButtonToBuy = styled.button`
  width: 90%;
  padding: 16px;
  background-color: #38b5ff;
  color: white;
  border: none;
  border-radius: 30px;
  cursor:pointer;
  font-size: 18px;
  
  }
`;
const OrderTotalPriceInfo = styled.div`
  display: flex;
  align-items: end;
  margin: 20px 0;
`;
const OrderTotalPrice = styled.div`
  height: 25px;
  margin: 0 10px;
  color: #38b5ff;
  font-size: 30px;
`;
const OrderBookPrice = styled.div`
  color: #38b5ff;
`;
const OrderBookTitle = styled.span`
  font-weight: 700;
`;
const PartImg = styled.div`
  width: 60px;
  height: 85px;
  margin-right: 10px;
`;
const PartInfo = styled.div`
  display: flex;
  align-items: center;
`;
const OrderListWrap = styled.div`
  margin-top: 100px;
  width: 60%;
`;
const OrderInfoWrap = styled.div`
  margin-top: 100px;
  width: 30%;
`;
const OrderItemPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 10px;
`;
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  width: 58%;
  margin: auto;
`;
const Title = styled.strong`
  margin: 10px 10px 10px 0;
  font-weight: 700;
  font-size: 20px;
`;

export default Order;

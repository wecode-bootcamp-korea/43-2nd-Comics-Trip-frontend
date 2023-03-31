import React, { useEffect, useState } from 'react';
import Icon from '../../components/Icon/Icon';
import * as s from './BookCaseStyled';

const BookCase = () => {
  const [buyBooksData, setBuyBooksData] = useState({});
  const [rentBooksData, setRentBooksData] = useState({});
  const [remainingTime, setRemainingTime] = useState('Loding');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('API address')
      .then(response => response.json())
      .then(data => {
        setBuyBooksData(data);
      });
  }, []);

  useEffect(() => {
    fetch('/data/rentalList.json')
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setRentBooksData(data);
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const rental = new Date();
      const expired = new Date('2023-04-02T17:59:00');
      const gap = expired - rental;

      if (gap < 0) {
        clearInterval(intervalId);
        setRemainingTime('만료되었습니다.');
      } else {
        const hours = String(Math.floor(gap / (1000 * 60 * 60))).padStart(
          2,
          '0'
        );
        const minutes = String(
          Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, '0');
        const seconds = String(Math.floor((gap % (1000 * 60)) / 1000)).padStart(
          2,
          '0'
        );
        setRemainingTime(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <s.Wrapper>
        <s.Title>내 서재</s.Title>
      </s.Wrapper>
      <s.Wrapper>
        <s.AllCategory>모든 책</s.AllCategory>
        <s.Category>책장</s.Category>
        <s.Category>선호 작품</s.Category>
      </s.Wrapper>
      <s.GrayWrapper>
        <s.WrapperWithBorder>
          <s.Wrapper justify="space-between">
            <s.Form>
              <Icon icon="faMagnifyingGlass" />
              <s.Input type="text" placeholder="모든 책 검색" />
            </s.Form>
            <div>
              {ICONS.map(icon => {
                return (
                  <s.Button key={icon.id}>
                    <Icon icon={icon.iconName} />
                  </s.Button>
                );
              })}
            </div>
          </s.Wrapper>
        </s.WrapperWithBorder>
        <s.Section>
          <s.SectionTitle>구매한 작품</s.SectionTitle>
          <s.OrderList>
            {ORDER_LIST.map(({ id, img, title }) => {
              return (
                <s.ImgLi key={id}>
                  <s.Img src={img} alt={title} />
                  <s.Count>총 2권</s.Count>
                </s.ImgLi>
              );
            })}
          </s.OrderList>
        </s.Section>
        <s.Section>
          <s.SectionTitle>대여한 작품</s.SectionTitle>
          <s.OrderList>
            {rentBooksData.data.map(({ id, book_image_url, sequence }) => {
              return (
                <s.RentImgLi key={id}>
                  <s.Img src={book_image_url} alt="onepiece" />
                  <s.Sequence>{sequence}권</s.Sequence>
                  <s.CountDownWrap>
                    <s.CountDown>{remainingTime}</s.CountDown>
                  </s.CountDownWrap>
                </s.RentImgLi>
              );
            })}
          </s.OrderList>
        </s.Section>
      </s.GrayWrapper>
    </div>
  );
};

export default BookCase;

const ORDER_LIST = [
  {
    id: 1,
    title: 'Snoopy',
    img: 'images/snoopy.jpg',
  },
  {
    id: 2,
    title: 'Snoopy',
    img: 'images/snoopy.jpg',
  },
  {
    id: 3,
    title: 'Snoopy',
    img: 'images/snoopy.jpg',
  },
  {
    id: 4,
    title: 'Snoopy',
    img: 'images/snoopy.jpg',
  },
];

const ICONS = [
  { id: 1, iconName: 'faBars' },
  { id: 2, iconName: 'faCircleCheck' },
  { id: 3, iconName: 'faEllipsisVertical' },
];

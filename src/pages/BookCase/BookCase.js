import React from 'react';
import Icon from '../../components/Icon/Icon';
import * as s from './BookCaseStyled';

const BookCase = () => {
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
            {ORDER_LIST.map(book => {
              return (
                <s.ImgLi key={book.id}>
                  <s.Img src={book.img} alt={book.title} />
                </s.ImgLi>
              );
            })}
          </s.OrderList>
        </s.Section>
        <s.Section>
          <s.SectionTitle>대여한 작품</s.SectionTitle>
          <s.OrderList>
            {ORDER_LIST.map(book => {
              return (
                <s.ImgLi key={book.id}>
                  <s.Img src={book.img} alt={book.title} />
                </s.ImgLi>
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
];

const ICONS = [
  { id: 1, iconName: 'faBars' },
  { id: 2, iconName: 'faCircleCheck' },
  { id: 3, iconName: 'faEllipsisVertical' },
];

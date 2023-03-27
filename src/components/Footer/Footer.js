import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterSection>
        <FooterCategorySection>
          {FOOTER_LIST.map(list => {
            return (
              <FooterCategoryPart key={list.id}>
                {list.text.map(info => {
                  return <li key={info}>{info}</li>;
                })}
              </FooterCategoryPart>
            );
          })}
        </FooterCategorySection>
        <FooterCategoryAside>
          {FOOTER_IMG_LIST.map(ele => (
            <FooterImg key={ele.id} src={ele.img}></FooterImg>
          ))}
        </FooterCategoryAside>
      </FooterSection>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  border-top: 1px solid black;
  width: 100%;
  height: 400px;
  position: absolute;
  align-items: center;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

const FooterSection = styled.div`
  display: flex;
`;

const FooterCategorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  list-style: none;
  margin-left: 100px;
  width: 50%;
  padding: 1.5rem 0;
  flex-direction: row;
`;

const FooterCategoryAside = styled.div`
  display: flex;
  width: 400px;
  list-style: none;
  justify-content: space-between;
  padding: 1.5rem 0;
  margin: 25px 0 0 80px;
`;

const FooterImg = styled.img`
  width: 60px;
  height: 60px;
`;

const FooterCategoryPart = styled.ul`
  height: 100%
  padding: revert;
  line-height: 1.7;
  font-size: 13.3px;
  font-weight: 700;
  color: #787878;
`;

export default Footer;

const FOOTER_LIST = [
  { id: 1, text: ['고객센터', '공지사항'] },
  {
    id: 2,
    text: [
      '서비스',
      '코믹페이퍼',
      '제휴카드',
      '뷰어 다운로드',
      'CP 사이트',
      '코믹셀렉트 B2B',
      '코믹바탕',
    ],
  },
  {
    id: 3,
    text: ['기타 문의', '콘텐츠 제공 문의', '사업 제휴 문의'],
  },
  {
    id: 4,
    text: ['회사', '회사 소개', '인재채용'],
  },
  {
    id: 5,
    text: [
      '코믹(주) 사업자 정보',
      '이용약관',
      '개인정보 처리방침',
      '청소년보호정책',
      '사업자정보확인',
    ],
  },
];

const FOOTER_IMG_LIST = [
  { id: 1, alt: '인스타그램 이미지', img: './images/Footer/instagram(2).png' },
  { id: 2, alt: '틱톡 이미지', img: './images/Footer/tiktok.png' },
  { id: 3, alt: '트위터 이미지', img: './images/Footer/twitter.png' },
  { id: 4, alt: '유튜브 이미지', img: './images/Footer/youtube.png' },
];

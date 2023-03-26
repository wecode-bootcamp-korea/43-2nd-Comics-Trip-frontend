import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import Category from '../../components/Category/Category';
import Mari from '../../assets/images/IMG_1211.JPG';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Main = () => {
  const [rankingData, setRankingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 3,
    arrow: true,
    draggable: true,
  };

  const elementScroll = useRef([]);

  const scrollToCategory = index => {
    if (!elementScroll.current[index]) return;
    elementScroll.current[index].scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('/data/rankingList.json')
      .then(res => res.json())
      .then(data => {
        setRankingData(data);
      });
  }, []);

  useEffect(() => {
    fetch('/data/categoryList.json')
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      });
  }, []);

  return (
    <>
      <Div>
        <Best>베스트</Best>
        <StyledSlider {...settings}>
          {rankingData.map(({ id, title, writer, rating, age }) => {
            return (
              <Slide key={id}>
                <RankingListImg src={Mari} />
                <RankingListId>{id}</RankingListId>
                <Column>
                  <Title>{title}</Title>
                  <Writer>{writer}</Writer>
                  <Rating>{rating}</Rating>
                </Column>
              </Slide>
            );
          })}
        </StyledSlider>
      </Div>
      <WindowScroll>
        {categoryData.map(({ id, category }, index) => {
          return (
            <li key={id}>
              <ScrollButton onClick={() => scrollToCategory(index)}>
                {category}
              </ScrollButton>
            </li>
          );
        })}
      </WindowScroll>
      <Category
        data={categoryData}
        setData={setCategoryData}
        scroll={elementScroll}
      />
    </>
  );
};

const Best = styled.strong`
  font-size: 22px;
`;

const WindowScroll = styled.ul`
  position: fixed;
  height: 200px;
  right: 5%;
  top: 30%;
`;
const ScrollButton = styled.button`
  border: 0;
  border-radius: 15px;
  background-color: #38b5ff;
  width: 83px;
  padding: 10px 0;
  color: white;
  font-size: 15px;
  margin: 10px 0;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 58%;
  margin: 100px auto;
`;

const StyledSlider = styled(Slider)`
  margin-top: 13px;
  width: 100%;
  .slick-prev {
    left: -30px;
  }
  .slick-next {
    right: -30px;
  }
  .slick-prev::before,
  .slick-next::before {
    font-size: 30px;
    opacity: 0.75;
    color: black;
  }
`;

const Slide = styled.button`
  display: flex !important;
  align-items: center;
  border: 0;
  cursor: pointer;
  background-color: white;
`;

const RankingListImg = styled.img`
  width: 34%;
  height: 114px;
`;

const RankingListId = styled.div`
  width: 33%;
  height: 114px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 33%;
`;
const Title = styled.div`
  font-size: 16px;
`;
const Writer = styled.div`
  font-size: 14px;
  text-align: left;
  margin: 5px 0;
`;
const Rating = styled.div`
  font-size: 13px;
`;

export default Main;

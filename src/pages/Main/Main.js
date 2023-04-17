import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Category from "../../components/Category/Category";
import { APIS } from "../../config";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const [rankingData, setRankingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 3,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const navigate = useNavigate();

  const elementScroll = useRef([]);

  const scrollToCategory = (index) => {
    if (!elementScroll.current[index]) return;
    elementScroll.current[index].scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetch(APIS.best)
      .then((res) => res.json())
      .then((data) => {
        setRankingData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(APIS.genre)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
    <>
      <BestList>
        <Best>베스트</Best>
        <StyledSlider {...settings}>
          {rankingData.map(
            ({ id, title, author, avgRating, book_image }, index) => {
              return (
                <Slide
                  onClick={() => {
                    navigate(`/productdetail/${id}`);
                  }}
                  key={id}
                >
                  <RankingListImg src={book_image} />
                  <RankingListId>{index + 1}</RankingListId>
                  <Column>
                    <Title>{title}</Title>
                    <Writer>{author}</Writer>
                    <Rating>
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      {parseInt(avgRating)}
                    </Rating>
                  </Column>
                </Slide>
              );
            }
          )}
        </StyledSlider>
      </BestList>

      <Category
        data={categoryData}
        setData={setCategoryData}
        scroll={elementScroll}
        navigate={navigate}
      />
      <WindowScroll>
        {categoryData.map(({ id, genre }, index) => {
          return (
            <li key={id}>
              <ScrollButton onClick={() => scrollToCategory(index)}>
                {genre}
              </ScrollButton>
            </li>
          );
        })}
      </WindowScroll>
      <ScrollTop
        onClick={() => {
          window.scrollTo({ top: 0, screenLeft: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} /> TOP
      </ScrollTop>
    </>
  );
};

const ScrollTop = styled.button`
  background-color: white;
  width: 83px;
  padding: 10px 0;
  margin-left: 92%;
  border: 1px solid #fff;
  border-radius: 15px;
  position: fixed;
  bottom: 40px;

  :hover {
    cursor: pointer;
    box-shadow: 0px 3px 6px #adadad;
  }

  :active {
    box-shadow: inset 0px 3px 6px #adadad;
  }
`;

const Best = styled.strong`
  font-size: 22px;
`;

const WindowScroll = styled.ul`
  /* display: inline; */
  position: sticky;
  top: 100px;
  width: 83px;
  bottom: 300px;
  margin-left: 92%;

  li {
    display: inline;
  }
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

const BestList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
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
    opacity: 1;
    color: #38b5ff;
  }
`;

const Slide = styled.button`
  display: flex !important;
  align-items: center;
  border: 0;
  border-radius: 5px;
  background-color: white;
  :hover {
    cursor: pointer;
    box-shadow: 0px 3px 6px #adadad;
  }
  :active  {
    box-shadow: inset 0px 3px 6px #adadad;
  }
`;

const RankingListImg = styled.img`
  width: 25%;
  height: 114px;
  border-radius: 4px;
`;

const RankingListId = styled.div`
  width: 25%;
  height: 114px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
`;
const Title = styled.div`
  text-align: start;
  font-size: 16px;
`;
const Writer = styled.div`
  font-size: 14px;
  text-align: left;
  margin: 5px 0;
`;
const Rating = styled.div`
  font-size: 13px;
  color: #fa722d;
`;

export default Main;

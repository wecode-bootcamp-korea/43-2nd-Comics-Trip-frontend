import React, { useState, useEffect, useRef } from 'react';

import Slider from 'react-slick';
import styled from 'styled-components';
import LastPage from '../../assets/images/LastPage.png';

const Viewer = props => {
  const { viewerData, closeViewer } = props;
  const [page, setPage] = useState(1);
  const [part, setPart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPart, setCurrentPart] = useState(0);

  const sliderRef = useRef();

  useEffect(() => {
    const time = setTimeout(() => {
      sliderRef.current.slickGoTo(0);
    }, 100);

    return () => {
      clearTimeout(time);
    };
  }, [currentPart]);

  const bookNum = e => {
    setCurrentPart(e.target.value - 1);
    setPage(1);
  };

  const handleInputChange = e => {
    setPage(e.target.value);
    sliderRef.current.slickGoTo(e.target.value - 1);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    arrow: true,
    draggable: true,
    swipeToSlide: true,
    afterChange: current => {
      setPage(current + 1);
    },
  };

  const firstPage = () => {
    alert('첫번째 페이지입니다.');
  };

  const comparePart = () => {
    if (currentPart + 1 === part.volumes.at(-1).sequence) {
      return alert('마지막 권입니다.');
    } else {
      return setCurrentPart(currentPart + 1);
    }
  };

  const toNextPart = () => {
    window.confirm('다음 권을 열람하시겠습니까?')
      ? comparePart()
      : setPage(page);
  };

  useEffect(() => {
    setPart(viewerData.data[currentPart]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <CloseButton onClick={closeViewer}>╳</CloseButton>
      <Modal>
        <Section>
          <Title>{part.title}</Title>
          <PartList>
            {part.volumes.map(({ name, pages, sequence }) => {
              return (
                <React.Fragment key={pages}>
                  <Part value={sequence} onClick={bookNum}>
                    {sequence}권
                  </Part>
                  {currentPart === sequence - 1 &&
                    pages.map(({ id, name, sequence }) => {
                      return (
                        <StoryList
                          value={sequence}
                          key={id}
                          onClick={() => {
                            setPage(sliderRef.current.slickGoTo(id - 1));
                          }}
                        >
                          {name}
                        </StoryList>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </PartList>
        </Section>
        <PageSection>
          <ImgSection>
            <FirstPage onClick={firstPage} value={page} />
            <StyledSlider {...settings} ref={sliderRef}>
              {part.volumes[currentPart].pages.map(({ image_url, id }) => {
                return (
                  <div key={id}>
                    <RankingListImg src={image_url} />
                  </div>
                );
              })}

              <LastPageImg src={LastPage} alt="none" />
            </StyledSlider>
            <CurrentPage
              type="range"
              min="1"
              max={part.volumes[currentPart].single_volume_page_count}
              value={page || 0}
              onChange={handleInputChange}
            />
          </ImgSection>
          <ToNextPart
            onClick={toNextPart}
            value={page}
            title={part.volumes[currentPart].single_volume_page_count}
          />
          <PageNation>
            쪽: {page}/{part.volumes[currentPart].single_volume_page_count}
          </PageNation>
        </PageSection>
      </Modal>
    </>
  );
};

export default Viewer;

const StoryList = styled.div`
  margin-bottom: 5px;
  :hover {
    cursor: pointer;
  }
`;

const ToNextPart = styled.div`
  width: 20%;
  height: 90%;
  content: '';
  z-index: 20;
  position: fixed;
  right: 0;
  display: ${props => (props.value === props.title ? '' : 'none')};
  :hover {
    cursor: pointer;
  }
`;

const FirstPage = styled.div`
  width: 20%;
  height: 90%;
  content: '';
  z-index: 20;
  position: fixed;
  display: ${props => (props.value === 1 ? '' : 'none')};
  :hover {
    cursor: pointer;
  }
`;

const LastPageImg = styled.img`
  width: 400px !important;
  margin: 200px;
`;

const PageNation = styled.p`
  text-align: center;
  margin-bottom: 5px;
`;

const Title = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 25px;
`;

const PartList = styled.div`
  text-align: center;
`;

const Part = styled.button`
  width: 100%;
  padding: 0 15px;
  font-weight: 500;
  font-size: 20px;
  line-height: 60px;
  text-decoration: none;
  background-color: #0000;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const PageSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 92%;
`;

const CurrentPage = styled.input`
  height: 6px;
  width: 100%;
  margin: 0 auto 10px;
  border-radius: 5px;
  opacity: 0.5;
  background: #cbcbcb;
  :hover {
    opacity: 0.5;
  }
`;

const Modal = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border: 1px solid #333;
`;

const Section = styled.div`
  width: 8%;
  height: 100%;
  border-right: 1px solid #dadada;
`;

const ImgSection = styled.div`
  height: 90%;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  font-size: 15px;
  z-index: 20;
`;

const StyledSlider = styled(Slider)`
  margin-top: 50px;

  height: 100%;
  .slick-prev {
    left: 0px;
    z-index: 10;
    width: 20%;
    height: 100%;
  }
  .slick-next {
    right: 0;
    z-index: 10;
    width: 20%;
    height: 100%;
  }

  .slick-prev::before {
    position: fixed;
    left: 0;
    font-size: 30px;
    opacity: 0.8;
    color: #38b5ff;
  }

  .slick-next::before {
    position: fixed;
    right: 0;
    font-size: 30px;
    opacity: 0.8;
    color: #38b5ff;
  }
`;

const RankingListImg = styled.img`
  width: 90%;
  height: 800px;
  margin: auto;
`;

import React, { useEffect, useState } from 'react';
import Countdown from '../../components/Countdown/Countdown';
import Viewer from '../../components/Viewer/Viewer';
//import { APIS } from '../../config';
import Icon from '../../components/Icon/Icon';
import * as s from './BookCaseStyled';

const BookCase = () => {
  const [ownBooksData, setOwnBooksData] = useState([]);
  const [rentBooksData, setRentBooksData] = useState([]);
  const [viewerData, setViewerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openViewer = () => {
    setIsViewerOpen(true);
  };
  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  useEffect(() => {
    fetch('http://10.58.52.95:3001/librarys/owner', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE2ODA2OTgyNzB9.gzl0wRAtIycPuMrSe0cyP4LRacwOJ8GLvAgWrRChq_M',
      },
    })
      .then(response => response.json())
      .then(data => {
        setOwnBooksData(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('http://10.58.52.95:3001/librarys/rental', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE2ODA2OTgyNzB9.gzl0wRAtIycPuMrSe0cyP4LRacwOJ8GLvAgWrRChq_M',
      },
    })
      .then(response => response.json())
      .then(data => {
        setRentBooksData(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const ownToViewer = index => {
    fetch(
      `http://10.58.52.95:3001/viewers/own/${ownBooksData[index].book_id}/owners`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE2ODA2OTgyNzB9.gzl0wRAtIycPuMrSe0cyP4LRacwOJ8GLvAgWrRChq_M',
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        setViewerData(data);
        openViewer();
      });
  };

  const rentToViewer = index => {
    fetch(
      `http://10.58.52.95:3001/viewers/rental/${rentBooksData[index].book_id}/rentals`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE2ODA2OTgyNzB9.gzl0wRAtIycPuMrSe0cyP4LRacwOJ8GLvAgWrRChq_M',
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        setViewerData(data);
        openViewer();
      });
  };

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
        {isViewerOpen && (
          <Viewer
            closeViewer={closeViewer}
            setIsViewerOpen={setIsViewerOpen}
            viewerData={viewerData}
          />
        )}
        <s.Section>
          <s.SectionTitle>구매한 작품</s.SectionTitle>
          <s.OrderList>
            {ownBooksData.map(
              ({ book_id, book_image_url, book_count }, index) => {
                return (
                  <s.ImgLi
                    key={book_id}
                    onClick={() => {
                      ownToViewer(index);
                    }}
                  >
                    <s.Img src={book_image_url} alt="comic book" />
                    <s.Count>총 {book_count} 권</s.Count>
                  </s.ImgLi>
                );
              }
            )}
          </s.OrderList>
        </s.Section>
        <s.Section>
          <s.SectionTitle>대여한 작품</s.SectionTitle>
          <s.OrderList>
            {rentBooksData.map(
              (
                { single_volume_id, book_image_url, return_date, sequence },
                index
              ) => {
                return (
                  <s.RentImgLi
                    key={single_volume_id}
                    onClick={() => {
                      rentToViewer(index);
                    }}
                  >
                    <s.Img src={book_image_url} alt="comic book" />
                    <s.Sequence>{sequence}권</s.Sequence>
                    <s.CountDownWrap>
                      <Countdown return_date={return_date} />
                    </s.CountDownWrap>
                  </s.RentImgLi>
                );
              }
            )}
          </s.OrderList>
        </s.Section>
      </s.GrayWrapper>
    </div>
  );
};

export default BookCase;

const ICONS = [
  { id: 1, iconName: 'faBars' },
  { id: 2, iconName: 'faCircleCheck' },
  { id: 3, iconName: 'faEllipsisVertical' },
];

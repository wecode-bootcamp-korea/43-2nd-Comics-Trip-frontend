import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIS } from '../../config';
import * as s from '../../pages/ProductDetail/ProductDetailStyled';

const BookList = ({ title, bookList }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [ownedData, setOwnedData] = useState([]);
  const [rentalData, setRentalData] = useState([]);
  const errorMsg = {
    NOT_EXIST_TOKEN: '로그인이 필요합니다.',
    '선택된 도서가 없습니다.': '선택된 도서가 없습니다.',
  };

  useEffect(() => {
    fetch(`${APIS.bookcase}/owner`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('TOKEN'),
      },
    })
      .then(response => response.json())
      .then(data => {
        setOwnedData(data.data);
      });

    fetch(`${APIS.bookcase}/rental`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('TOKEN'),
      },
    })
      .then(response => response.json())
      .then(data => {
        setRentalData(data.data);
      });
  }, []);

  const visibleBooks = showAllBooks ? bookList : bookList.slice(0, 7);

  const handleShowMore = () => {
    setShowAllBooks(prev => !prev);
  };

  const navigate = useNavigate();

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedList(prev => [...prev, id]);
    } else {
      setCheckedList(checkedList.filter(el => el !== id));
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      const idArr = [];
      bookList.forEach(el => {
        idArr.push(el.id);
      });
      setCheckedList(idArr);
    } else {
      setCheckedList([]);
    }
  };

  const clickToOrder = () => {
    fetch(APIS.owner, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('TOKEN'),
      },
      body: JSON.stringify({
        type: 'owner_price',
        bookId: checkedList,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'SUCCESSFULLY_CREATE_OWNER') {
          alert('결제가 완료되었습니다.');
          navigate('/bookcase');
        } else {
          alert(errorMsg[data.message]);
        }
      });
  };

  const clickToRent = () => {
    fetch(APIS.rental, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('TOKEN'),
      },
      body: JSON.stringify({
        type: 'rental_price',
        bookId: checkedList,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'SUCCESSFULLY_CREATE_RENTAL') {
          alert('결제가 완료되었습니다.');
          navigate('/bookcase');
        } else {
          alert(errorMsg[data.message]);
        }
      });
  };

  return (
    <s.DetailBodySeries>
      <s.SeriesSelectAll>
        <div>
          <input
            type="checkbox"
            id="selectAll"
            onChange={e => {
              handleAllCheck(e.target.checked);
            }}
            checked={checkedList.length === bookList.length}
          />
          <s.selectAllLabel htmlFor="selectAll">전체 선택</s.selectAllLabel>
        </div>
        <div>
          <s.SeriesDetail marginRight="10px" color="#666" fontWeight="700">
            총 {checkedList.length}권
          </s.SeriesDetail>
          <s.SeriesDetail marginRight="15px" color="#1f8ce6" fontWeight="700">
            {(
              checkedList.length * Number(bookList[0].discount_owner_price)
            ).toLocaleString()}{' '}
            원
          </s.SeriesDetail>
          <s.SeriesDetail marginRight="20px" color="#444444" fontWeight="700">
            대여:{' '}
            {(
              checkedList.length * Number(bookList[0].rental_price)
            ).toLocaleString()}{' '}
            원
          </s.SeriesDetail>
          <s.Button onClick={clickToOrder}>선택 소장</s.Button>
          <s.Button onClick={clickToRent}>선택 대여</s.Button>
        </div>
      </s.SeriesSelectAll>
      <div>
        <ul>
          {visibleBooks.map(
            ({
              id,
              sequence,
              book_image,
              discount_owner_price,
              discount,
              owner_price,
              rental_price,
              published_date,
              single_volume_pages,
            }) => {
              return (
                <s.SeriesList key={id}>
                  <s.Label htmlFor={id}>
                    <input
                      type="checkbox"
                      id={id}
                      onChange={e => {
                        handleSingleCheck(e.target.checked, id);
                      }}
                      checked={checkedList.includes(id)}
                      disabled={
                        ownedData
                          .map(el => el.single_volume_id_list)
                          .flat()
                          .includes(id) ||
                        rentalData.map(el => el.single_volume_id).includes(id)
                      }
                    />
                    <s.ThumbNail width="40px" height="58px" margin="0 15px">
                      <s.ThumbNailImg
                        width="40px"
                        height="58px"
                        borderRadius="4px"
                        src={book_image}
                        alt="onepiece"
                      />
                    </s.ThumbNail>
                    <div>
                      <s.SeriesTitle>{`${title} ${sequence}권`}</s.SeriesTitle>
                      <s.SeriesTitle>
                        <s.SeriesDetail fontWeight="400" color="#666">
                          {published_date.replace(/-/g, '.')}
                        </s.SeriesDetail>
                        <s.SeriesDetail fontWeight="400" color="#666">
                          {single_volume_pages}쪽
                        </s.SeriesDetail>
                      </s.SeriesTitle>
                      <s.SeriesTitle>
                        <s.SeriesDetail color="#1f8ce6">
                          {Number(discount_owner_price).toLocaleString()}원
                        </s.SeriesDetail>
                        <s.SeriesDetail color="#eb5847">
                          ({discount}% ↓)
                        </s.SeriesDetail>
                        <s.SeriesDetail
                          color="#666"
                          fontWeight="400"
                          textLine="line-through"
                        >
                          {Number(owner_price).toLocaleString()}원
                        </s.SeriesDetail>
                        <s.SeriesDetail color="#444444" marginLeft="10px">
                          대여: {Number(rental_price).toLocaleString()}원
                        </s.SeriesDetail>
                      </s.SeriesTitle>
                    </div>
                  </s.Label>
                </s.SeriesList>
              );
            }
          )}
        </ul>
        <s.SeeAllButton onClick={handleShowMore}>
          {showAllBooks ? '접기 ▲' : '더보기 ▼'}
        </s.SeeAllButton>
      </div>
    </s.DetailBodySeries>
  );
};

export default BookList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingStar from '../../components/RatingStar/RatingStar';
import BookList from '../../components/BookList/BookList';
import { APIS } from '../../config';
import * as s from './ProductDetailStyled';

const ProductDetail = () => {
  const [productDetailData, setProductDetailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(0);
  const [starNum, setStarNum] = useState(0);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [recommendList, setRecommendList] = useState([]);
  const params = useParams();

  const handleShowAll = () => {
    setShowAllReviews(prev => !prev);
  };

  useEffect(() => {
    fetch(`${APIS.detail}/${params.id}`)
      .then(response => response.json())
      .then(data => {
        setProductDetailData(data.data[0]);
      });

    fetch(`${APIS.review}/${params.id}`)
      .then(response => response.json())
      .then(data => {
        setReviewList(data.data);
      });

    fetch(`${APIS.recommend}/${params.id}`)
      .then(response => response.json())
      .then(data => {
        setRecommendList(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div>loading</div>;

  const visibleReviews = showAllReviews ? reviewList : reviewList.slice(0, 5);

  const addReview = () => {
    if (textAreaValue.length > 9) {
      fetch(APIS.review, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: localStorage.getItem('TOKEN'),
        },
        body: JSON.stringify({
          bookId: params.id,
          rating: starNum,
          content: textAreaValue,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'NOT_EXIST_TOKEN') {
            alert('로그인을 해주세요.');
          } else {
            alert('등록되었습니다.');
            setStarNum(0);
            fetch(`${APIS.review}/${params.id}`)
              .then(response => response.json())
              .then(data => {
                setReviewList(data.data);
                setIsDisabled(true);
              });
          }
        });

      setTextAreaValue('');
    }
  };

  const deleteReview = () => {
    fetch(`${APIS.review}/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('TOKEN'),
      },
    }).then(response => {
      if (!response.ok) {
        alert('로그인을 해주세요.');
      } else {
        alert('삭제되었습니다.');
        fetch(`${APIS.review}/${params.id}`)
          .then(response => response.json())
          .then(data => {
            setReviewList(data.data);
            setIsDisabled(false);
          });
      }
    });
  };

  return (
    <s.DetailPage>
      <s.DetailWrap>
        <s.DetailBodyWrap>
          <s.DetailBodyArticle>
            <s.ThumbNail width="210px" height="287px">
              <s.ThumbNailImg
                width="210px"
                height="287px"
                src={productDetailData.image}
                alt="comicBook"
              />
            </s.ThumbNail>
            <s.BodyArticle>
              <s.BodyArticleWrap marginBottom="15px">
                <span>만화 e북</span>
                <span> ▸ </span>
                <span>{productDetailData.genres}</span>
              </s.BodyArticleWrap>
              <s.BookTitle>{productDetailData.title}</s.BookTitle>
              <s.BodyArticleWrap marginBottom="25px">
                <RatingStar
                  starNum={Number(productDetailData.bookRate)}
                  setStarNum={setStarNum}
                />
                {Number(productDetailData.bookRate)}점 (2,578명)
              </s.BodyArticleWrap>
              <s.BodyArticleWrap>
                <s.BodyArticleContent>
                  {productDetailData.author}
                </s.BodyArticleContent>
                <span> 글, 그림</span>
              </s.BodyArticleWrap>
              <s.BodyArticleWrap>
                <s.BodyArticleContent>
                  {productDetailData.publisher}
                </s.BodyArticleContent>
                <span> 출판</span>
              </s.BodyArticleWrap>
              <s.BodyArticleWrap>
                총 {Number(productDetailData.single_volume_number)}권
              </s.BodyArticleWrap>
            </s.BodyArticle>
          </s.DetailBodyArticle>
          <BookList
            title={productDetailData.title}
            bookList={productDetailData.single_volumes}
          />
          <div>
            <s.ReviewTitle>리뷰</s.ReviewTitle>
            <s.ReviewInputWrap>
              <s.ReviewInputTitle>이 책을 평가해주세요!</s.ReviewInputTitle>
              <s.Star>
                <RatingStar
                  type="select"
                  starNum={starNum}
                  setStarNum={setStarNum}
                  hover={hover}
                  setHover={setHover}
                />
              </s.Star>
              <s.TextArea
                placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 비공개될 수 있습니다."
                value={textAreaValue}
                onChange={e => setTextAreaValue(e.target.value)}
                disabled={isDisabled}
              />
              <s.ButtonWrap>
                <s.AlertButton>리뷰 작성 유의사항</s.AlertButton>
                <s.Button
                  marginRight="0"
                  onClick={addReview}
                  disabled={textAreaValue.length <= 9}
                >
                  리뷰 남기기
                </s.Button>
              </s.ButtonWrap>
            </s.ReviewInputWrap>
            <s.ReviewTitle>
              <p>구매자 245</p>
              <p>
                <s.ReviewArray color="#303538" border="1px solid #d1d5d9">
                  최신순
                </s.ReviewArray>
                <s.ReviewArray>공감순</s.ReviewArray>
              </p>
            </s.ReviewTitle>
            <ul>
              {visibleReviews.map(
                ({ Id, rating, email, created_at, content }) => {
                  return (
                    <s.ReviewList key={Id}>
                      <s.ReviewListFront>
                        <s.ReviewIdWrap>
                          <RatingStar
                            starNum={rating}
                            setStarNum={setStarNum}
                          />
                          <s.ReviewId color="black">
                            {email.slice(0, 4) + '***'}
                          </s.ReviewId>
                          <s.ReviewId fontWeight="400" color="#808991">
                            {created_at.slice(0, 10).replace(/-/g, '.')}
                          </s.ReviewId>
                          <s.ReviewId>신고 ・ 차단</s.ReviewId>
                        </s.ReviewIdWrap>
                        <div>
                          <s.Comment>{content}</s.Comment>
                        </div>
                      </s.ReviewListFront>
                      <div>
                        <s.LikeButton marginRight="6px">댓글</s.LikeButton>
                        <s.LikeButton marginRight="6px">좋아요</s.LikeButton>
                        <s.LikeButton onClick={deleteReview}>삭제</s.LikeButton>
                      </div>
                    </s.ReviewList>
                  );
                }
              )}
            </ul>
            <s.SeeAllButton onClick={handleShowAll}>
              {showAllReviews ? '접기 ▲' : '더보기 ▼'}
            </s.SeeAllButton>
          </div>
        </s.DetailBodyWrap>
        <s.DetailAsideWrap>
          <s.RecommendListWrap>
            <s.RecommendListTitle>이 책과 함께 둘러본 책</s.RecommendListTitle>
            {recommendList.map(recommend => {
              return (
                <s.RecommendList key={recommend.id}>
                  {recommend.title}
                </s.RecommendList>
              );
            })}
          </s.RecommendListWrap>
        </s.DetailAsideWrap>
      </s.DetailWrap>
    </s.DetailPage>
  );
};

export default ProductDetail;

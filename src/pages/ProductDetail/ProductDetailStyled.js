import styled from 'styled-components';

export const DetailPage = styled.div`
  width: 1016px;
  margin: 0 auto 60px auto;
`;

export const DetailWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

export const DetailBodyWrap = styled.div`
  padding: 30px;
  border-right: 1px solid #e6e8eb;
`;

export const DetailBodyArticle = styled.article`
  display: flex;
`;

export const ThumbNail = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
`;

export const ThumbNailImg = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  object-fit: cover;
`;

export const BodyArticle = styled.div`
  width: 500px;
  margin-left: 35px;
`;

export const BodyArticleWrap = styled.p`
  margin-bottom: 5px;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  height: 14px;
  font-size: 12px;
  color: #333;
`;

export const BodyArticleContent = styled.span`
  font-weight: 700;
`;

export const BookTitle = styled.h1`
  margin-bottom: 25px;
  font-size: 30px;
  color: #333;
  font-weight: 700;
`;

export const DetailAsideWrap = styled.div`
  width: 210px;
  padding-top: 20px;
`;

export const RecommendListWrap = styled.ul`
  position: sticky;
  top: 60px;
  margin: 0 20px;
`;

export const RecommendListTitle = styled.h3`
  padding-bottom: 10px;
  font-weight: 700;
`;

export const RecommendList = styled.li`
  padding: 10px 0;
  border-top: 1px solid #ddd;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  &:hover {
    cursor: pointer;
  }
`;

export const DetailBodySeries = styled.div`
  margin-top: 40px;
`;

export const SeriesSelectAll = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  border-top: 2px solid #666;
  border-bottom: 1px dotted #bbb;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const selectAllLabel = styled.label`
  margin-left: 10px;
`;

export const SeriesList = styled.li`
  display: felx;
  align-items: center;
  height: 75px;
  border-bottom: 1px solid #f2f4f5;
`;

export const SeriesTitle = styled.p`
  color: #000;
  font-size: 13px;
  line-height: 1.5em;
  font-weight: 700;
`;

export const SeriesDetail = styled.span`
  margin-right: 5px;
  margin-right: ${({ marginRight }) => marginRight};
  margin-left: ${({ marginLeft }) => marginLeft};
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-decoration-line: ${({ textLine }) => textLine};
`;

export const Button = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  margin-right: ${({ marginRight }) => marginRight};
  background: #1f8ce6;
  border: 1px solid #0077d9;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  font-size: 12px;

  &:disabled {
    background-color: #99c6f3;
    border: 1px solid #99c6f3;

    &:hover {
      background-color: #99c6f3;
      border: 1px solid #99c6f3;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: #0077d9;
  }
`;

export const SeeAllButton = styled.button`
  width: 100%;
  margin-top: 10px;
  font-size: 13px;
  padding: 0.8em;
  border-width: 2px;
  color: #808991;
  background: #fff;
  border: 2px solid #d1d5d9;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background-color: rgb(209 213 217 / 30%);
  }
`;

export const ReviewTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-top: 40px;
  border-bottom: 2px solid #7d8e9e;
  color: #666;
  font-size: 15px;
  font-weight: 700;
  line-height: 1em;
`;

export const ReviewArray = styled.span`
  padding: 0 8px;
  font-size: 12px;
  color: ${({ color }) => color};
  border-right: ${({ border }) => border};
`;

export const ReviewInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReviewInputTitle = styled.p`
  margin: 40px 0 0 0;
  text-align: center;
  font-size: 18px;
  color: #999;
  font-weight: 700;
`;

export const TextArea = styled.textarea`
  border: 2px solid #d1d5d9;
  border-radius: 5px;
  width: 80%;
  height: 112px;
  font-size: 13px;
  letter-spacing: -0.03em;
  padding: 12px 15px;
  margin-bottom: 10px;
  line-height: 1.5em;
  resize: none;
  ::placeholder {
    font-weight: 700;
    color: #999;
  }

  :disabled {
    background-color: #f2f4f5;
  }

  :focus {
    outline: none;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 630px;
`;

export const AlertButton = styled(Button)`
  color: #808991;
  background: #fff;
  border: 1px solid #d1d5d9;
  box-shadow: 0 1px 1px 0 rgb(209 213 217 / 30%);
  font-size: 12px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ReviewList = styled(SeriesList)`
  justify-content: space-between;
  height: 125px;
  border-bottom: 1px solid #d1d5d9;
`;

export const ReviewListFront = styled.div`
  display: flex;
  margin-right: 10px;
  color: #666;
  font-size: 13px;
`;

export const ReviewIdWrap = styled.div`
  margin-right: 25px;
`;

export const ReviewId = styled.p`
  margin-top: 9px;
  font-weight: 700;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
`;

export const Comment = styled.p`
  font-size: 14px;
  color: #212529;
  line-height: 1.7em;
`;

export const LikeButton = styled.button`
  padding: 6px 10px;
  margin-right: ${({ marginRight }) => marginRight};
  color: #808991;
  background: #fff;
  border: 1px solid #d1d5d9;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgb(209 213 217 / 30%);
  font-size: 11px;
  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }
`;

export const Star = styled.span`
  margin: 20px 0 25px 0;
  font-size: 40px;
`;

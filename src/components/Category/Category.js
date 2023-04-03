import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Category = ({ data, setData, scroll, navigate }) => {
  const seeMore = categoryId => {
    setData(
      data.map(category => {
        if (category.id === categoryId) {
          return { ...category, isOpened: !category.isOpened };
        } else {
          return category;
        }
      })
    );
  };

  return (
    <CategoryBox>
      {data.map(({ id, genre, book_list, isOpened }, index) => {
        const newList = book_list.slice(0, 6);
        const moreList = book_list.slice(6);

        return (
          <Column key={id}>
            <CategoryTitle ref={element => (scroll.current[index] = element)}>
              {genre}
            </CategoryTitle>
            <CategoryList>
              {newList.map(({ id, title, author, rating, book_image }) => {
                return (
                  <ListInfo
                    id={title}
                    key={id}
                    onClick={() => {
                      navigate(`/productdetail/${id}`);
                    }}
                  >
                    <CategoryListImg id={genre} src={book_image} />
                    <Title>{title}</Title>
                    <Writer>{author}</Writer>
                    <Rating>
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      {rating}
                    </Rating>
                  </ListInfo>
                );
              })}
            </CategoryList>
            <CategoryList>
              {isOpened &&
                moreList.map(({ id, title, author, rating, book_image }) => {
                  return (
                    <ListInfo
                      key={id}
                      onClick={() => {
                        navigate(`/productdetail/${id}`);
                      }}
                    >
                      <CategoryListImg id={genre} src={book_image} />
                      <Title>{title}</Title>
                      <Writer>{author}</Writer>
                      <Rating>
                        <FontAwesomeIcon icon={faStar} size="xs" />
                        {rating}
                      </Rating>
                    </ListInfo>
                  );
                })}
            </CategoryList>
            {book_list.length > 6 && (
              <SeeMoreButton onClick={() => seeMore(id)}>
                {isOpened ? '접기▲' : '더보기+'}
              </SeeMoreButton>
            )}
          </Column>
        );
      })}
    </CategoryBox>
  );
};

export default Category;

const Column = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const ListInfo = styled.div`
  margin: 0 5px;
  border: 0;
  border-radius: 5px;

  &: hover {
    cursor: pointer;
    box-shadow: 0px 3px 6px #adadad;
  }
  &: active {
    box-shadow: inset 0px 3px 6px #adadad;
  }
`;
const SeeMoreButton = styled.button`
  width: 70px;
  cursor: pointer;
  margin: 0 auto 20px;
  color: #38b5ff;
  background-color: white;
  border: 1px solid #38b5ff;
  border-radius: 13px;
  text-align: center;
  padding: 8px;
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
  color: #fa722d;
`;

const CategoryBox = styled.div`
  width: 1150px;
  margin: auto;
`;
const CategoryTitle = styled.div`
  margin: 0 0 0 5px;
  font-size: 22px;
`;

const CategoryListImg = styled.img`
  width: 180px;
  height: 261px;
  border-radius: 4px;
  filter: ${props => (props.id === '성인' ? 'blur(4px)' : '')};
`;

const CategoryList = styled.div`
  display: flex;
  margin: 5px 0;
`;

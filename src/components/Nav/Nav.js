import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './../Login/Login';
import BookcasePoint from './BookcasePoint';

const Nav = () => {
  const [alarmData, setAlarmData] = useState([]);
  const [allBooksData, setAllBooksData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputSearchValue, setSearchInputValue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowAlarmData, setIsShowAlarmData] = useState(false);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const navigate = useNavigate();

  const goToPages = path => {
    navigate(`${path}`);
  };

  const changeInputValue = event => {
    setInputValue(event.target.value);
  };

  const handleDropDownKey = event => {
    const chosenTextList = allBooksData.filter(textItem =>
      textItem.title.includes(inputValue)
    );
    setSearchInputValue(chosenTextList);

    if (inputValue) {
      if (
        event.key === 'ArrowDown' &&
        chosenTextList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }
      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1);
      }
      if (event.key === 'Escape') {
        setDropDownItemIndex(-1);
        setInputValue('');
      }
    }
  };

  const handleAlarm = () => {
    setIsShowAlarmData(prev => !prev);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const logoutToken = () => {
    localStorage.removeItem('TOKEN');
    alert('로그아웃 되었습니다.');
    navigate(`/`);
  };

  useEffect(() => {
    fetch('http://10.58.52.95:3001/books/search', {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(res => res.json())
      .then(data => setAllBooksData(data));
  }, []);

  useEffect(() => {
    fetch('./data/alarmData.json')
      .then(res => res.json())
      .then(data => setAlarmData(data));
  }, []);

  const insertedToken = localStorage.getItem('TOKEN');

  return (
    <Wrapper>
      <MainLogo
        alt="logo"
        src="./images/Nav/ct_logo.png"
        onChange={changeInputValue}
        onClick={() => goToPages('/')}
      />
      <SearchSection>
        <WholeBox>
          <SearchBar
            type="text"
            placeholder="검색어를 입력하세요."
            value={inputValue}
            onChange={changeInputValue}
            onKeyUp={handleDropDownKey}
          />
          {inputValue && (
            <DropDownBox>
              {inputSearchValue.length === 0 && (
                <DropDownItem>해당하는 만화가 없습니다</DropDownItem>
              )}
              {inputSearchValue.map((dropDownItem, dropDownIndex) => {
                return (
                  <DropDownItem
                    key={dropDownIndex.id}
                    onClick={() => {
                      navigate(`/productdetail/${dropDownItem.id}`);
                      setInputValue('');
                    }}
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                    className={
                      dropDownItemIndex === dropDownIndex ? 'selected' : ''
                    }
                  >
                    {dropDownItem.title}
                  </DropDownItem>
                );
              })}
            </DropDownBox>
          )}
        </WholeBox>
        <SearchIcon
          alt="search"
          src="./images/Nav/search(1).png"
          onClick={() => goToPages('/allbookcase')}
        />
      </SearchSection>
      <IconAside>
        <AlarmIcon
          alt="alarm"
          src="./images/Nav/bell.png"
          onClick={handleAlarm}
        />
        <BookCaseIcon
          alt="bookcase"
          src="./images/Nav/book.png"
          onClick={() => goToPages('/bookcase')}
        />
        <BookcasePoint />
        {insertedToken ? (
          <LoginButton onClick={logoutToken}>LOGOUT</LoginButton>
        ) : (
          <LoginButton onClick={handleModal}>LOGIN</LoginButton>
        )}
        {isModalOpen && <Login setIsModalOpen={setIsModalOpen} />}
      </IconAside>
      {isShowAlarmData && (
        <ShowAlarmList>
          {alarmData.map(ele => {
            return <div key={ele.id}>{ele.message}</div>;
          })}
        </ShowAlarmList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 75px;
  height: 112px;
  border-bottom: 1px solid gray;
  background-color: white;
`;

const MainLogo = styled.img`
  height: 100px;
  cursor: pointer;
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: space-between;
  right: 0px;
`;

const boxPadding = 10;
const inputHeight = 50;

const WholeBox = styled.div`
  position: relative;
  display: grid;
  padding: ${boxPadding}px;
`;

const SearchBar = styled.input`
  float: left;
  display: grid;
  text-align: center;
  width: 500px;
  height: ${inputHeight}px;
  align-items: center;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 16px;
  border: 3px solid #b0c4de;
  border-radius: 20px;
  background-color: #f0f8ff;
`;

const DropDownBox = styled.ul`
  position: absolute;
  top: ${boxPadding + inputHeight}px;
  left: ${boxPadding}px;
  right: ${boxPadding}px;
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;
  cursor: pointer;

  &.selected {
    background-color: lightgray;
  }
`;

const SearchIcon = styled.img`
  height: 40px;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 30px;
  border-top: none;
`;

const IconAside = styled.div`
  display: flex;
  width: auto;
`;

const AlarmIcon = styled.img`
  height: 40px;
  margin-left: 30px;
  cursor: pointer;
`;

const ShowAlarmList = styled.div`
  display: flex;
  width: 75px;
  height: 45px;
  border: 1.3px solid gray;
`;

const BookCaseIcon = styled.img`
  height: 40px;
  margin-left: 30px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 75px;
  height: 45px;
  margin-left: 30px;
  color: gray;
  cursor: pointer;
  border-radius: 12.5px;
  border: 1.3px solid #b0c4de;
  background-color: #f0f8ff;
`;

export default Nav;

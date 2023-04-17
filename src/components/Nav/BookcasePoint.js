import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BookcasePoint = () => {
  const [bookData, setBookData] = useState([]);

  const isCheckBookcase = bookData.length >= 1;

  useEffect(() => {
    fetch("./data/keepBooksData.json")
      .then((res) => res.json())
      .then((data) => setBookData(data));
  }, []);

  return isCheckBookcase && <RedPoint />;
};

const RedPoint = styled.div`
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
  border: 1px solid #fff;
`;

export default BookcasePoint;

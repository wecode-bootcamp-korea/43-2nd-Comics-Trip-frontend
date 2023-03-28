import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingStar = ({ starNum, setStarNum, hover, setHover, type }) => {
  const ratingArr = new Array(5).fill(1);

  const clickRatingNum = num => {
    type === 'select' && setStarNum(num);
  };

  const hoverRating = num => {
    type === 'select' && setHover(num);
  };

  return (
    <span>
      {ratingArr.map((num, idx) => {
        return (
          <FontAwesomeIcon
            key={idx}
            icon={faStar}
            style={
              num + idx <= (starNum || hover)
                ? { color: '#fa722d' }
                : { color: '#dadfe3' }
            }
            onClick={() => clickRatingNum(num + idx)}
            onMouseEnter={() => hoverRating(num + idx)}
            onMouseLeave={() => hoverRating(0)}
          />
        );
      })}
    </span>
  );
};

export default RatingStar;

import React from 'react';
import PropTypes from 'prop-types';
import s from './ButtonLoadMore.module.css';
function ButtonLoadMore({ onClick }) {
  return (
    <button
      className={s.Button}
      type="button"
      onClick={() => {
        onClick();
      }}
    >
      Load more
    </button>
  );
}
ButtonLoadMore.propTypes = { onClick: PropTypes.func.isRequired };
export default ButtonLoadMore;

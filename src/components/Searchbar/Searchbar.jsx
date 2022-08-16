import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = evt => setSearchInput(evt.currentTarget.value);

  const onSubmitHandle = e => {
    e.preventDefault();
    onSubmit(searchInput);
    reset();
  };

  const reset = () => {
    setSearchInput('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmitHandle}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>
            <FcSearch />
          </span>
        </button>

        <input
          name="searchValue"
          value={searchInput}
          onChange={handleInputChange}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = { onSubmit: PropTypes.func };
export default Searchbar;

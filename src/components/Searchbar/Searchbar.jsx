import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = { searchInput: '' };

  handleInputChange = e => {
    this.setState({ searchInput: e.currentTarget.value });
  };

  onSubmitHandle = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchInput);
    this.reset();
  };

  reset() {
    this.setState({ searchInput: '' });
  }

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmitHandle}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>
              <FcSearch />
            </span>
          </button>

          <input
            name="searchValue"
            value={this.state.searchInput}
            onChange={this.handleInputChange}
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
}

Searchbar.propTypes = { onSubmit: PropTypes.func };
export default Searchbar;

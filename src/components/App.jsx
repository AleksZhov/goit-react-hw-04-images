import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore';
import axiosRequest from './axiosRequest';
import { Audio } from 'react-loader-spinner';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    err: '',
    status: 'idle',
    queryPage: 1,
    returnedArray: [],
    totalHits: 0,
    pending: false,
    isModalOpen: false,
    modalImgURL: '',
    modalImgAlt: '',
  };

  searchValueUpdate = value => {
    if (value === this.state.searchValue) {
      alert(`The ${value} was already requested. Please type another request`);
      return;
    }
    this.setState({ searchValue: value, queryPage: 1, totalHits: 0 });
  };

  searchValueReset() {
    this.setState({ searchValue: '' });
  }

  newAPIRequest = () => {
    this.setState({ pending: true });
    axiosRequest(this.state.searchValue, this.state.queryPage)
      .then(res => {
        this.setState({
          returnedArray:
            this.state.queryPage === 1
              ? res.data.hits
              : [...this.state.returnedArray, ...res.data.hits],
          totalHits: res.data.totalHits,
        });
        this.setState({ pending: false });
      })
      .catch(error => console.log(error));
  };

  pageIncrement = () => {
    this.setState({ queryPage: this.state.queryPage + 1 });
  };

  openingModal = (largeUrl, alt) => {
    this.setState({
      isModalOpen: true,
      modalImgURL: largeUrl,
      modalImgAlt: alt,
    });
  };

  closingModal = () => {
    this.setState({ isModalOpen: false });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.queryPage !== this.state.queryPage
    ) {
      this.newAPIRequest(this.state.searchValue);
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.searchValueUpdate} />
        <ImageGallery
          imageArr={this.state.returnedArray}
          openModal={this.openingModal}
        />
        {this.state.pending && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass="spinner"
          />
        )}
        {this.state.totalHits > 12 && (
          <ButtonLoadMore onClick={this.pageIncrement} />
        )}
        {this.state.isModalOpen && (
          <Modal
            url={this.state.modalImgURL}
            alt={this.state.modalImgAlt}
            onClose={this.closingModal}
          />
        )}
      </div>
    );
  }
}

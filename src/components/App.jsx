import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore';
import axiosRequest from './axiosRequest';
import { Audio } from 'react-loader-spinner';
import Modal from './Modal/Modal';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [queryPage, setQueryPage] = useState(1);
  const [returnedImgArray, setReturnedImgArray] = useState([]);
  const [pending, setPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');
  const [modalImgAlt, setModalImgAlt] = useState('');

  const searchValueUpdate = value => {
    if (value === searchValue) {
      alert(`The ${value} was already requested. Please type another request`);
      return;
    }
    setSearchValue(value);
    setQueryPage(1);
    newAPIRequest();
  };

  const newAPIRequest = () => {
    setPending(true);
    axiosRequest(searchValue, queryPage)
      .then(res => {
        setReturnedImgArray(
          queryPage === 1
            ? res.data.hits
            : [...returnedImgArray, ...res.data.hits]
        );

        setPending(false);
      })
      .catch(error => console.log(error));
  };

  const pageIncrement = () => {
    setQueryPage(queryPage + 1);
    newAPIRequest();
  };

  const openingModal = (largeUrl, alt) => {
    setModalImgURL(largeUrl);
    setModalImgAlt(alt);
    setIsModalOpen(true);
  };

  const closingModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   if (searchValue === '' && queryPage === 1) return;
  //   newAPIRequest();
  // }, [searchValue, queryPage]);

  return (
    <div className="App">
      <Searchbar onSubmit={searchValueUpdate} />
      <ImageGallery imageArr={returnedImgArray} openModal={openingModal} />
      {pending && (
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
      {returnedImgArray.length % 12 === 0 && returnedImgArray.length !== 0 && (
        <ButtonLoadMore onClick={pageIncrement} />
      )}
      {isModalOpen && (
        <Modal url={modalImgURL} alt={modalImgAlt} onClose={closingModal} />
      )}
    </div>
  );
}

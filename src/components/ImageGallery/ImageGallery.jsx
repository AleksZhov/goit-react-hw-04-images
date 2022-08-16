import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import s from './ImageGallery.module.css';

function ImageGallery({ imageArr, openModal }) {
  return (
    <ul className={s.ImageGallery}>
      {imageArr.map(({ id, tags, previewURL, largeImageURL }) => (
        <ImageGalleryItem
          key={previewURL}
          id={id}
          tags={tags}
          previewURL={previewURL}
          largeImageURL={largeImageURL}
          onClick={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  imageArr: PropTypes.array.isRequired,
  openModal: PropTypes.func,
};
export default ImageGallery;

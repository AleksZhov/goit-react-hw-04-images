import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {};

  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.imageArr.map(({ id, tags, previewURL, largeImageURL }) => (
          <ImageGalleryItem
            key={previewURL}
            id={id}
            tags={tags}
            previewURL={previewURL}
            largeImageURL={largeImageURL}
            onClick={this.props.openModal}
          />
        ))}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  imageArr: PropTypes.array.isRequired,
  openModal: PropTypes.func,
};
export default ImageGallery;

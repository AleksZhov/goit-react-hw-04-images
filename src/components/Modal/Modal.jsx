import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

function Modal({ url, alt, onClose }) {
  const onEscClose = evt => {
    if (evt.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEscClose);
    return () => {
      document.removeEventListener('keydown', onEscClose);
    };
  }, []);

  return (
    <div
      className={s.Overlay}
      onClick={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={s.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;

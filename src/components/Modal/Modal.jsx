import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  onEscClose = evt => {
    if (evt.key === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscClose);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscClose);
  }
  render() {
    return (
      <div
        className={s.Overlay}
        onClick={event => {
          if (event.target === event.currentTarget) {
            this.props.onClose();
          }
        }}
      >
        <div className={s.Modal}>
          <img src={this.props.url} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;

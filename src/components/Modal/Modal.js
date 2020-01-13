import React from 'react';
import './Modal.css';

function Modal({
  title, content, show, close,
}) {
  if (show) {
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          { close ? <button type="button" className="close-btn" onClick={close}>{'\u2A09'}</button> : null }
          {title ? <h2 className="modal-title">{title}</h2> : null}
          {content}
        </div>
      </div>
    );
  }
  return null;
}

export default Modal;

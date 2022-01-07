import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { StyledBackdrop, StyledModal } from './ModalStyles';

let modalRoot;
modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'overlays');
document.body.appendChild(modalRoot);

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <StyledBackdrop>
          <StyledModal>{props.children}</StyledModal>
        </StyledBackdrop>,
        modalRoot
      )}
    </Fragment>
  );
};

export default Modal;

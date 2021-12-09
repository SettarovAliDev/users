import { Fragment } from "react";
import ReactDOM from "react-dom";

import { StyledBackdrop, StyledModal } from "./ModalStyles";

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <StyledBackdrop>
          <StyledModal>{props.children}</StyledModal>
        </StyledBackdrop>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;

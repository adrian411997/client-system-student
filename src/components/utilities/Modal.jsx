import React from "react";

const Modal = ({ title, idModal, children, functionButtonF }) => {
  return (
    <div
      className="modal fade"
      id={idModal}
      tabIndex="-1"
      aria-labelledby={idModal}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {children}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={functionButtonF}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

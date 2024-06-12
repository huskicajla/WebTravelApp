/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import FormComponent from "./FormComponent";

const ModalComponent = ({ closeModal }) => {
  return (
    <dialog id="form_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Enter your details</h3>
        <FormComponent />
        <div className="modal-action">
          <button onClick={closeModal} className="btn">Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalComponent;

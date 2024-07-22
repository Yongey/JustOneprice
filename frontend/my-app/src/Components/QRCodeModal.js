import React from "react";
import Modal from "react-modal"; // Import the modal component

// Ensure you call Modal.setAppElement() at the root of your application
Modal.setAppElement("#root");

const QRCodeModal = ({ isOpen, onRequestClose, qrCodeSrc }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="QR Code Modal"
    className="modal"
    overlayClassName="overlay"
  >
    <h2>Scan the QR Code</h2>
    <img src={qrCodeSrc} alt="QR Code" className="qr-code-image" />
    <button onClick={onRequestClose} className="close-button">
      Close
    </button>
  </Modal>
);

export default QRCodeModal;

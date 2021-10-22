import React from "react";
// import { propTypes } from "react-bootstrap/esm/Image";
import { Modal, Button } from "react-bootstrap";

const IdleTimeOutModal = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>You Have Been Idle!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You Will Get Timed Out. You want to stay?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleLogout}>
          Logout
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Stay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IdleTimeOutModal;

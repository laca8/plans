import React from "react";
import { Alert } from "react-bootstrap";
const Success = ({ message }) => {
  return (
    <Alert variant="success" style={{ marginTop: "10px" }}>
      {message}
    </Alert>
  );
};

export default Success;

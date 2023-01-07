import React from "react";
import { Alert } from "react-bootstrap";
const Error = ({ error }) => {
  return (
    <Alert variant="danger" style={{ marginTop: "10px", textAlign: "left" }}>
      {error}
    </Alert>
  );
};

export default Error;

import React from "react";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
const ReactPrint = ({ componentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "print data",
    onAfterPrint: () => alert("print successed"),
  });
  return <Button onClick={handlePrint}>print</Button>;
};

export default ReactPrint;

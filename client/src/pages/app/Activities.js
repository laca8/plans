import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormText,
  Container,
  Card,
} from "react-bootstrap";
const Activities = ({ goal, setDataAct }) => {
  const [activities, setActivites] = useState([
    {
      city: "",
      partners: "",
      numSeminars: Number(0),
      numAtt: Number(0),
    },
  ]);
  const addActivities = () => {
    setActivites([
      ...activities,
      {
        city: "",
        partners: "",
        numSeminars: Number(0),
        numAtt: Number(0),
      },
    ]);

    console.log(activities);
  };
  const removeActivities = (index) => {
    const values = [...activities];

    values.splice(index, 1);
    setActivites(values);
  };

  const handleChangeAct = (index, e) => {
    const values = [...activities];
    values[index][e.target.name] = e.target.value;
    setActivites(values);
    //console.log(activities);
  };
  useEffect(() => {
    setDataAct({ goal, activities });
  }, [activities, goal]);
  return (
    <>
      {activities.map((x, i) => (
        <>
          <div className="form-row">
            <Form.Group className="input">
              <Form.Label>عدد الحضور</Form.Label>
              <Form.Control
                type="number"
                className="input"
                placeholder="ادخل عدد الحضور"
                name="numAtt"
                value={x.numAtt}
                onChange={(e) => handleChangeAct(i, e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="input name">
              <Form.Label>عدد المحاضرات</Form.Label>
              <Form.Control
                type="number"
                className="input"
                placeholder="ادخل  عدد المحاضرات"
                name="numSeminars"
                value={x.numSeminars}
                onChange={(e) => handleChangeAct(i, e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="input name">
              <Form.Label>الجهات الشريكة</Form.Label>
              <Form.Control
                type="text"
                className="input"
                placeholder="ادخل الجهات الشريكة"
                name="partners"
                value={x.partners}
                onChange={(e) => handleChangeAct(i, e)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="input name">
              <Form.Label>المحافظة</Form.Label>
              <Form.Control
                type="text"
                className="input"
                placeholder="ادخل  المحافظة"
                name="city"
                value={x.city}
                onChange={(e) => handleChangeAct(i, e)}
              ></Form.Control>
            </Form.Group>
          </div>
          <div style={{ marginTop: "10px" }}>
            {i != 0 ? (
              <Button
                variant="outline-danger"
                onClick={() => removeActivities(i)}
              >
                الغاء
              </Button>
            ) : null}
            <Button
              variant="outline-success"
              style={{ marginLeft: "10px" }}
              onClick={() => addActivities()}
            >
              اضافة نشاط في محافظة اخر{" "}
            </Button>
          </div>
        </>
      ))}
    </>
  );
};

export default Activities;

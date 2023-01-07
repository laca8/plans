import React, { useState, useEffect } from "react";
import Loader from "../../component/features/Loader";
import Error from "../../component/features/Error";
import Success from "../../component/features/Success";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  FormText,
  Container,
  Card,
} from "react-bootstrap";
import { Typography } from "@mui/material";
import { addAppAction } from "../../redux/action/appAction";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Activities from "./Activities";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TagsInput } from "react-tag-input-component";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const Add = () => {
  const dispatch = useDispatch();
  const addApp = useSelector((state) => state.addApp);
  const { app, loading, error, success } = addApp;
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [goal, setGoal] = useState("");
  const [law, setLaw] = useState([{ name: "" }]);
  const [cities, setCities] = useState([]);
  const [subGoals, setSubGoals] = useState([
    {
      name: "",
      activity: "",
      time1: "",
      year1: "",
      costSupplies: Number(0),
      costWages: Number(0),
      impOfficer: "",

      city: "",
      partners: "",
      numAtt: "",
      numSeminars: "",
      ind: "",
      source: "",

      // outcome: "",
    },
  ]);
  const handleChange = (index, e) => {
    const values = [...subGoals];
    values[index][e.target.name] = e.target.value;
    setSubGoals(values);
  };

  const handleChangeLaw = (index, e) => {
    const values = [...law];
    values[index][e.target.name] = e.target.value;
    setLaw(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newApp = {
      name,
      manager,
      goal,
      law,
      subGoals,
    };
    console.log(newApp);

    dispatch(addAppAction(newApp));
  };
  useEffect(() => {
    if (success) {
      alert("تم اضافة برنامج الان اذهب الي صفحة ال kpis لاختيار الاولوية");
    }
  }, [success]);
  const addFields = () => {
    setSubGoals([...subGoals, { name: "", qty: 0 }]);
    console.log(subGoals);
  };
  const removeFields = (index) => {
    const values = [...subGoals];
    values.splice(index, 1);
    setSubGoals(values);
  };

  const addArr = (i) => {
    subGoals[i]?.arr.push({
      city: "",
      partners: "",
      numAtt: "",
      numSeminars: "",
      ind: "",
      source: "",
    });
    setSubGoals([...subGoals]);
    console.log(subGoals);
  };
  const removeArr = (i) => {
    const values = [...subGoals];
    subGoals[i]?.arr.splice(i, 1);
    //values.splice(index, 1);
    setSubGoals(values);
  };

  const addLaws = () => {
    setLaw([...law, { name: "", qty: 0 }]);
    console.log(law);
  };
  const removeLaws = (index) => {
    const values = [...law];
    values.splice(index, 1);
    setLaw(values);
  };
  const govs = () => [
    "القاهرة",
    "الجيزة",
    "الاسكندرية",
    "الدقهلية",
    " البحر الاحمر",
    "البحيرة",
    "الفيوم",
    "الغربية",
    "الاسماعيلية",
    "المنوفية",
    "المنيا",
    "القليوبية",
    "الوادى الجديد",
    "السويس",
    "اسوان",
    "اسيوط",
    "بنى سويف",
    "بورسعيد",
    "دمياط",
    "الشرقية",
    "جنوب سيناء",
    "كفر الشيخ",
    "مطروح",
    "الأقصر",
    "قنا",
    "شمال سيناء",
    "سوهاج",
  ];

  const times = ["الربع الاول", "الربع الثاني", "الربع الثالث", "الربع الرابع"];
  return (
    <Container style={{ textAlign: "right" }}>
      <Typography variant="h6" style={{ fontWeight: "bold", margin: "5px 0" }}>
        اضافة برنامج
      </Typography>

      {loading && <Loader />}
      {error && <Error error={error} />}
      {success && (
        <Success message={"تم اضافة برنامج الان اذهب الي صفحة ال kpis"} />
      )}
      <Form style={{ textAlign: "right" }} onSubmit={handleSubmit}>
        <div className="form-row">
          <Form.Group className="input">
            <Form.Label>الهدف العام</Form.Label>
            <Form.Control
              type="text"
              style={{ fontWeight: "bold", width: "100%" }}
              className="input"
              placeholder="ادخل الهدف العام البرنامج"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="input name">
            <Form.Label>مدير البرنامج</Form.Label>
            <Form.Control
              className="input"
              style={{ width: "100%" }}
              type="text"
              placeholder="ادخل مدير البرنامج"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name" className="input name">
            <Form.Label>الاسم</Form.Label>
            <Form.Control
              className="input"
              style={{ width: "100%" }}
              type="text"
              placeholder="ادخل اسم البرنامج"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </div>
        <>
          {law.map((x, i) => (
            <Row>
              <Col style={{ marginTop: "25px" }}>
                {i != 0 ? (
                  <Button variant="danger" onClick={() => removeLaws(i)}>
                    -
                  </Button>
                ) : null}
                <Button
                  variant="success"
                  style={{ marginLeft: "10px" }}
                  onClick={() => addLaws()}
                >
                  +
                </Button>
              </Col>
              <Col className="form-row">
                <Form.Group
                  controlId="name"
                  className="input name"
                  style={{ textAlign: "right" }}
                >
                  <Form.Label>حقوق</Form.Label>
                  <Form.Control
                    variant="outlined"
                    className="input"
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="ادخل  الحقوق"
                    name="name"
                    value={x.name}
                    onChange={(e) => handleChangeLaw(i, e)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          ))}
        </>

        <div>
          <Typography
            variant="h6"
            style={{ fontWeight: "bold", margin: "10px 0" }}
          >
            {" "}
            الاهداف الفرعية{" "}
          </Typography>
          <Card style={{ padding: "15px" }}>
            {subGoals?.map((goal, index) => (
              <>
                <div className="form-row">
                  <Form.Group controlId="name" className="input">
                    <Form.Label>مسئول التنفيذ</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="ادخل مسئول التنفيذ"
                      name="impOfficer"
                      value={goal?.impOfficer}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="input name">
                    <Form.Label>السنة</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="ادخل السنة"
                      name="year1"
                      value={goal?.year1}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="input name">
                    <Form.Label>الفترة</Form.Label>

                    <Form.Select
                      aria-label="اختر الفترة"
                      name="time1"
                      className="input"
                      style={{ fontWeight: "bold" }}
                      value={goal?.time1}
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option className="input">اختر</option>
                      {times.map((t, index) => (
                        <option value={t} key={index} className="input">
                          {t}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="name" className="input name">
                    <Form.Label>النشاط</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="ادخل النشاط"
                      name="activity"
                      value={goal?.activity}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="name" className="input name">
                    <Form.Label>اسم الهدف</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="ادخل اسم الهدف"
                      name="name"
                      value={goal?.name}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <Typography variant="h6">التكلفة</Typography>
                <div className="form-row">
                  <Form.Group className="input">
                    <Form.Label>مستلزمات</Form.Label>
                    <Form.Control
                      type="number"
                      className="input"
                      placeholder="ادخل تكلفة المستلزمات"
                      name="costSupplies"
                      value={goal?.costSupplies}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="input name">
                    <Form.Label>اجور</Form.Label>
                    <Form.Control
                      type="number"
                      className="input"
                      placeholder="ادخل تكلفة الاجور"
                      name="costWages"
                      value={goal?.costWages}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                </div>

                <div>
                  <div className="form-row">
                    <Form.Group className="input">
                      <Form.Label>عدد الحضور</Form.Label>
                      <Form.Control
                        style={{ textAlign: "right" }}
                        type="number"
                        className="input"
                        placeholder="ادخل عدد الحضور"
                        name="numAtt"
                        value={goal.numAtt}
                        onChange={(e) => handleChange(index, e)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="input name">
                      <Form.Label>عدد الانشطة</Form.Label>

                      <Form.Control
                        style={{ textAlign: "right" }}
                        type="number"
                        className="input"
                        placeholder="ادخل الانشطة"
                        name="numSeminars"
                        value={goal.numSeminars}
                        onChange={(e) => handleChange(index, e)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className="input name">
                      <Form.Label>الجهات الشريكة</Form.Label>

                      <Form.Control
                        type="text"
                        className="input"
                        placeholder="ادخل الجهات الشريكة"
                        name="partners"
                        value={goal.partners}
                        onChange={(e) => handleChange(index, e)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      className="input name"
                      //style={{ marginTop: "15px" }}
                    >
                      <Form.Label>المحافظات</Form.Label>

                      <Form.Control
                        type="text"
                        className="input"
                        placeholder="ادخل المحافظات"
                        name="city"
                        value={goal.city}
                        onChange={(e) => handleChange(index, e)}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </div>
                <div className="form-row">
                  <Form.Group className="input">
                    <Form.Label>المؤشرات</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="ادخل المؤشرات"
                      name="ind"
                      value={goal.ind}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="input name">
                    <Form.Label>مصدر التمويل</Form.Label>
                    <Form.Control
                      type="text"
                      className="input"
                      placeholder="ادخل مصدر التمويل"
                      name="source"
                      value={goal.source}
                      onChange={(e) => handleChange(index, e)}
                    ></Form.Control>
                  </Form.Group>
                </div>

                <div style={{ marginTop: "10px" }}>
                  {index != 0 ? (
                    <Button
                      variant="danger"
                      onClick={() => removeFields(index)}
                    >
                      الغاء
                    </Button>
                  ) : null}
                  <Button
                    variant="success"
                    style={{ marginLeft: "10px" }}
                    onClick={() => addFields()}
                  >
                    اضافة هدف فرعي اخر{" "}
                  </Button>
                </div>
              </>
            ))}
          </Card>
        </div>

        <Button type="submit" variant="primary" style={{ marginTop: "10px" }}>
          حفظ
        </Button>
      </Form>
    </Container>
  );
};

export default Add;

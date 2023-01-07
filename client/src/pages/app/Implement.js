import React, { useState, useEffect, Component, useRef } from "react";
import Loader from "../../component/features/Loader";
import Error from "../../component/features/Error";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FormText, Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import {
  listAppsUserAction,
  updateAppAction,
} from "../../redux/action/appAction";
const Implement = () => {
  const dispatch = useDispatch();
  const [impOutcome, setImpOutCome] = useState(Number(0));
  const [precentage, setPrecentage] = useState(Number(0));
  const [periods, setPeriods] = useState([
    "الشهر الاول",
    "الشهر الثاني",
    "الشهر الثالث",
    "تم التنفيذ بعد انتهاء الفترة",
  ]);
  const [outActivities, setOutActivities] = useState("");
  const [variant, setVariant] = useState("");
  const [review, setReview] = useState(Number(0));
  const [numAct, setNumAct] = useState(Number(0));
  const [out, setOut] = useState(Number(0));
  const [res, setRes] = useState(Number(0));
  const [act, setAct] = useState("");
  const [impCostWages, setImpCostWages] = useState(Number(0));
  const [impCostSupplies, setImpCostSupplies] = useState(Number(0));
  const [period, setPeriod] = useState("");
  const [msg, setMsg] = useState("");
  const listAppsByUser = useSelector((state) => state.listAppsByUser);
  const { apps, error, loading } = listAppsByUser;
  const updateApp = useSelector((state) => state.updateApp);
  const {
    app,
    error: errorUpdate,
    loading: loadingUpdate,
    success,
  } = updateApp;
  useEffect(() => {
    dispatch(listAppsUserAction());
  }, []);
  const handleUpdate = (id, goalId) => {
    const updateData = {
      review,
      numAct,
      outActivities,
      impTime: period,
      impCostWages,
      impCostSupplies,
      impOutcome,
      precentage,
    };
    dispatch(updateAppAction(id, goalId, updateData));
    dispatch(listAppsUserAction());
    setOutActivities("");
    setReview("");
    setNumAct("");
    setImpCostWages("");
    setImpCostSupplies("");
  };

  const [nameApp, setNameApp] = useState("");
  const [nameGoal, setNameGoal] = useState("");

  useEffect(() => {
    if (precentage <= 30) {
      if (period == "الشهر الاول") {
        setMsg("عمل جيد ولكن يجب عليك الاسراع");
        setVariant("warning");
      } else if (period == "الشهر الثاني") {
        setMsg("اسرع لم يتبقي سوي شهر");
        setVariant("warning");
      } else if (period == "الشهر الثالث") {
        setMsg("عمل غير جيد لقد انتهت الفترة ولم يتم تنفيذ المطلوب");
        setVariant("error");
      } else if (period == "تم التنفيذ بعد انتهاء الفترة") {
        setMsg("عمل غير جيد لقد انتهت الفترة ولم يتم تنفيذ المطلوب");
        setVariant("error");
      }
    }
    if (precentage > 30 && precentage <= 60) {
      if (period == "الشهر الاول") {
        setMsg("عمل جيد جدا");
        setVariant("warning");
      } else if (period == "الشهر الثاني") {
        setMsg("اسرع لم يتبقي سوي شهر");
        setVariant("warning");
      } else if (period == "الشهر الثالث") {
        setMsg("عمل غير جيد لقد انتهت الفترة ولم يتم تنفيذ المطلوب");
        setVariant("error");
      } else if (period == "تم التنفيذ بعد انتهاء الفترة") {
        setMsg("عمل غير جيد لقد انتهت الفترة ولم يتم تنفيذ المطلوب");
        setVariant("error");
      }
    }
    if (precentage > 60 && precentage <= 99) {
      if (period == "الشهر الاول") {
        setMsg("عمل جيد جدا");
        setVariant("warning");
      } else if (period == "الشهر الثاني") {
        setMsg("اسرع لم يتبقي سوي شهر");
        setVariant("warning");
      } else if (period == "الشهر الثالث") {
        setMsg("عمل غير جيد لقد انتهت الفترة ولم يتم تنفيذ المطلوب");
        setVariant("error");
      } else if (period == "تم التنفيذ بعد انتهاء الفترة") {
        setMsg("عمل غير جيد لقد انتهت الفترة ولم يتم تنفيذ المطلوب");
        setVariant("error");
      }
    }
    if (precentage >= 100) {
      if (period == "الشهر الاول") {
        setMsg("عمل جيد جدا");
        setVariant("success");
      } else if (period == "الشهر الثاني") {
        setMsg("عمل جيد جدا");
        setVariant("success");
      } else if (period == "الشهر الثالث") {
        setMsg("عمل جيد");
        setVariant("success");
      } else if (period == "تم التنفيذ بعد انتهاء الفترة") {
        setMsg("عمل غير جيد لم يتم تنفيذ المطلوب فب الفترة المحددة");
        setVariant("error");
      }
    }
    console.log(precentage);
    console.log(period);
  }, [precentage, msg, period]);

  useEffect(() => {
    console.log(res);
    console.log(precentage);
    console.log(out);

    apps
      ?.filter((x) => x.name == nameApp)
      .map((app, index) =>
        app?.subGoals
          .filter((x) => x.name == nameGoal)
          .map((x) => setOut(x.outcome))
      );
  }, [apps, nameApp, nameGoal, out]);
  useEffect(() => {
    if (success) {
      alert("تم التاكيد");
    }
  }, [success]);
  useEffect(() => {
    if (impOutcome) {
      setPrecentage(Math.round((impOutcome * 100) / out));
    }
  }, [impOutcome, out]);
  useEffect(() => {
    apps
      ?.filter((x) => x.name == nameApp)
      .map((app, index) =>
        app?.subGoals
          ?.filter((x) => x.name == nameGoal)
          ?.map((x) => {
            setImpOutCome(x.impOutcome);
            setAct(x.activity);
            setImpCostSupplies(x.impCostSupplies);
            setImpCostWages(x.impCostWages);
          })
      );
  }, [nameApp, nameGoal]);
  return (
    <Container style={{ textAlign: "right" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  color: "grey",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "1px solid grey",
                  padding: "10px",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {precentage}%
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography variant="h6"> التنفيذ</Typography>
            </div>
          </div>
          <div>
            <div style={{ textAlign: "left" }}>
              {msg && (
                <Alert
                  variant="filled"
                  severity={variant}
                  style={{
                    margin: "10px 0",
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {msg}
                </Alert>
              )}
            </div>

            <Form.Group>
              <Form.Label>اختر البرنامج</Form.Label>
              <Form.Select
                aria-label="اختر"
                value={nameApp}
                onChange={(e) => setNameApp(e.target.value)}
                style={{ fontWeight: "bold" }}
              >
                <option>اختر</option>
                {apps?.map((app, index) => (
                  <option value={app?.name} key={index}>
                    {app?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {nameApp ? (
              <Form.Group>
                <Form.Label>اختر الهدف</Form.Label>
                <Form.Select
                  aria-label="اختر"
                  style={{ fontWeight: "bold" }}
                  value={nameGoal}
                  onChange={(e) => setNameGoal(e.target.value)}
                >
                  <option>اختر</option>
                  {apps
                    ?.filter((x) => x.name == nameApp)
                    .map((app, index) => (
                      <>
                        {app?.subGoals.map((goal, index) => (
                          <option value={goal?.name} key={index}>
                            {goal?.name}
                          </option>
                        ))}
                      </>
                    ))}
                </Form.Select>
              </Form.Group>
            ) : null}
            {nameGoal ? (
              <>
                {apps
                  ?.filter((x) => x.name == nameApp)
                  .map((app, index) => (
                    <>
                      {app?.subGoals
                        .filter((x) => x.name == nameGoal)
                        .map((goal, index) => {
                          return (
                            <>
                              <div className="form-row">
                                <Form.Group className="input">
                                  <Form.Label>
                                    الفترة التي تم تنفيذ فيها البرنامج
                                  </Form.Label>

                                  <Form.Select
                                    aria-label="اختر الفترة التي تم تنفيذ فيها البرنامج"
                                    name="time"
                                    className="input"
                                    style={{ fontWeight: "bold" }}
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                  >
                                    <option className="input">اختر</option>
                                    {periods.map((t, index) => (
                                      <option
                                        value={t}
                                        key={index}
                                        className="input"
                                      >
                                        {t}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                                <Form.Group
                                  controlId="name"
                                  className="input name"
                                  style={{ width: "100%" }}
                                >
                                  <Form.Label>
                                    الانشطة التي تم تنفيذها
                                    {/*    <span
                                      style={{
                                        backgroundColor: "black",
                                        color: "#fff",
                                        padding: "2px",
                                        margin: "2px",
                                      }}
                                    >
                                      {goal?.impOutcome}
                                    </span>*/}
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    className="input"
                                    name="outcome"
                                    value={impOutcome}
                                    onChange={(e) =>
                                      setImpOutCome(e.target.value)
                                    }
                                  ></Form.Control>
                                </Form.Group>
                                <Form.Group
                                  controlId="name"
                                  className="input name"
                                  style={{ width: "100%" }}
                                >
                                  <Form.Label>نوع الانشطة</Form.Label>
                                  <Form.Control
                                    type="text"
                                    className="input"
                                    name="outcome"
                                    value={act}
                                    disabled
                                  ></Form.Control>
                                </Form.Group>
                              </div>
                              <>
                                <Typography>
                                  التكلفة المستخدمة في التنفيذ
                                </Typography>
                                <div className="form-row">
                                  <Form.Group
                                    controlId="name"
                                    className="input name"
                                    style={{ width: "100%" }}
                                  >
                                    <Form.Label> مستلزمات</Form.Label>
                                    <Form.Control
                                      type="number"
                                      className="input"
                                      name="access"
                                      value={impCostSupplies}
                                      onChange={(e) =>
                                        setImpCostSupplies(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                  <Form.Group
                                    controlId="name"
                                    className="input name"
                                    style={{ width: "100%" }}
                                  >
                                    <Form.Label>اجور</Form.Label>
                                    <Form.Control
                                      type="number"
                                      className="input"
                                      name="wages"
                                      value={impCostWages}
                                      onChange={(e) =>
                                        setImpCostWages(e.target.value)
                                      }
                                    ></Form.Control>
                                  </Form.Group>
                                </div>
                              </>
                              {goal?.outActivities == "نعم" ? (
                                <>
                                  <Typography>الانشطة غير مخطط لها</Typography>
                                  <div className="form-row">
                                    <Form.Group
                                      controlId="name"
                                      className="input name"
                                      style={{ width: "100%" }}
                                    >
                                      <Form.Label> قيم الانشطة 1/5</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="input"
                                        name="review"
                                        value={review}
                                        onChange={(e) =>
                                          setReview(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                    <Form.Group
                                      controlId="name"
                                      className="input name"
                                      style={{ width: "100%" }}
                                    >
                                      <Form.Label>عدد الانشطة</Form.Label>
                                      <Form.Control
                                        type="number"
                                        className="input"
                                        name="numAct"
                                        value={numAct}
                                        onChange={(e) =>
                                          setNumAct(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>

                                    <Form.Group
                                      controlId="name"
                                      className="input name"
                                      style={{ width: "100%" }}
                                    >
                                      <Form.Label>النشاط</Form.Label>
                                      <Form.Control
                                        type="text"
                                        className="input"
                                        name="outActivities"
                                        value={outActivities}
                                        onChange={(e) =>
                                          setOutActivities(e.target.value)
                                        }
                                      ></Form.Control>
                                    </Form.Group>
                                  </div>
                                </>
                              ) : null}

                              <div style={{ marginTop: "10px" }}>
                                {errorUpdate && <Error error={errorUpdate} />}
                                <Button
                                  onClick={() =>
                                    handleUpdate(app._id, goal._id)
                                  }
                                  disabled={loadingUpdate}
                                >
                                  حفظ
                                </Button>
                              </div>
                            </>
                          );
                        })}
                    </>
                  ))}
              </>
            ) : null}
          </div>
        </>
      )}
    </Container>
  );
};

export default Implement;

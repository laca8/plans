import React, { useState, useEffect } from "react";
import Loader from "../../component/features/Loader";
import Error from "../../component/features/Error";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FormText, Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addActivityAction,
  listAppsUserAction,
  updateApp2Action,
  updateAppAction,
} from "../../redux/action/appAction";
import Success from "../../component/features/Success";
import Activities from "./Activities";
const Kpis = () => {
  const [priority, setPriority] = useState(Number(0));
  const [res, setRes] = useState("");
  const [outActivity, setOutActivity] = useState("");

  const dispatch = useDispatch();
  const listAppsByUser = useSelector((state) => state.listAppsByUser);
  const { apps, error, loading } = listAppsByUser;

  const updateApp = useSelector((state) => state.updateApp);
  const { success, error: errorUpdate, loading: loadingUpdate } = updateApp;
  useEffect(() => {
    dispatch(listAppsUserAction());
  }, []);
  useEffect(() => {
    if (res == "عدد الانشطة") {
      apps
        ?.filter((x) => x.name == nameApp)
        ?.map((app, index) =>
          app?.subGoals
            ?.filter((x) => x.name == nameGoal)
            ?.map((x) => setPriority(x.numSeminars))
        );
    } else if (res == "عدد الحضور") {
      apps
        ?.filter((x) => x.name == nameApp)
        .map((app, index) =>
          app?.subGoals
            .filter((x) => x.name == nameGoal)
            .map((x) => setPriority(x.numAtt))
        );
    }
    console.log(priority);
  }, [res]);

  const [nameApp, setNameApp] = useState("");
  const [nameGoal, setNameGoal] = useState("");
  const [dataAct, setDataAct] = useState("");
  const handleUpdate = (id, goalId) => {
    const data = {
      outActivities: outActivity,
      outcome: Number(priority),
    };
    console.log(priority.split("-"));
    console.log(data);
    dispatch(updateApp2Action(id, goalId, data));
    // dispatch(addActivityAction(dataAct));
  };
  useEffect(() => {
    if (success) {
      alert("تم تحديث البرنامج اذهب الي صفحة ال implementation");
    }
  }, [success]);
  return (
    <Container style={{ textAlign: "right" }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          {success && (
            <Success
              message={"تم تحديث البرنامج اذهب الي صفحة ال implementation"}
            />
          )}
          <div>
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
                    ?.map((app, index) => (
                      <>
                        {app?.subGoals?.map((goal, index) => (
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
                  ?.map((app, index) => (
                    <>
                      {app?.subGoals
                        ?.filter((x) => x.name == nameGoal)
                        ?.map((goal, index) => (
                          <>
                            {/*        <Activities
                              goal={goal._id}
                              setDataAct={setDataAct}
                        />*/}

                            <div>
                              <Form.Group>
                                <Form.Label>اختر الاولوية</Form.Label>
                                <Form.Select
                                  aria-label="اختر"
                                  value={res}
                                  onChange={(e) => setRes(e.target.value)}
                                  style={{ fontWeight: "bold" }}
                                >
                                  <option>اختر</option>
                                  {["عدد الانشطة", "عدد الحضور"]?.map(
                                    (app, index) => (
                                      <option value={app} key={index}>
                                        {app}
                                      </option>
                                    )
                                  )}
                                </Form.Select>
                              </Form.Group>
                            </div>
                            <div>
                              <Form.Group>
                                <Form.Label>
                                  هل تريد اضافة انشطة غير مخطط لها
                                </Form.Label>
                                <Form.Select
                                  aria-label="اختر"
                                  value={outActivity}
                                  onChange={(e) =>
                                    setOutActivity(e.target.value)
                                  }
                                  style={{ fontWeight: "bold" }}
                                >
                                  <option>اختر</option>
                                  {["نعم", "لا"]?.map((app, index) => (
                                    <option value={app} key={index}>
                                      {app}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </div>

                            <div style={{ marginTop: "10px" }}>
                              {errorUpdate && <Error error={errorUpdate} />}
                              <Button
                                disabled={loadingUpdate}
                                onClick={(id, goalId) =>
                                  handleUpdate(app._id, goal._id)
                                }
                              >
                                حفظ
                              </Button>
                            </div>
                          </>
                        ))}
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

export default Kpis;

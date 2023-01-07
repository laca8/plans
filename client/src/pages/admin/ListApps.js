import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormText,
  Container,
  Card,
} from "react-bootstrap";
import ReactPrint from "../../component/outside/ReactPrint";
import Table from "react-bootstrap/Table";
import { Typography } from "@mui/material";
import { deleteAppAction, listAppAction } from "../../redux/action/appAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/features/Loader";
import Error from "../../component/features/Error";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { CSVLink } from "react-csv";
const Apps = () => {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([
    { label: "اسم البرنامج", key: "name" },
    { label: "مدير البرنامج", key: "manager" },
    { label: "الهدف العام للبرنامج", key: "name_goal" },
    { label: " عدد المحاضرات", key: "period" },
    { label: "عدد الحضور", key: "numSeminars" },
    { label: " المخرجات المتوقعة", key: "numAtt" },
    { label: "المخرجات التي تم تنفيذها", key: "outcome" },
    { label: "المخرجات التي تم تنفيذهل", key: "impOutcome" },
    { label: "الانشطة الغير مخطط لها", key: "outActivities" },
    { label: "عدد الانشطة الغير مخطط لها", key: "numAct" },
    { label: " تقييم الانشطة", key: "review" },
  ]);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAppAction());
  }, []);
  const listApps = useSelector((state) => state.listApps);
  const { apps, error, loading } = listApps;
  const deleteApp = useSelector((state) => state.deleteApp);
  const { app, error: errD, loading: loadD } = deleteApp;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleDelete = (id) => {
    dispatch(deleteAppAction(id));
    dispatch(listAppAction());
  };
  useEffect(() => {
    if (app) {
      alert("تم حذف البرنامج");
    }
  }, [app]);
  useEffect(() => {
    if (apps) {
      apps.forEach((item) => {
        data.push({
          name: item.name,
          manager: item.manager,
          name_goal: item.subGoals[0].name,
          period: item.subGoals[0].period,
          numSeminars: item.subGoals[0].numSeminars,
          numAtt: item.subGoals[0].numAtt,
          outcome: item.subGoals[0].outcome,
          impOutcome: item.subGoals[0].impOutcome,
          outActivities: item.subGoals[0].outActivities,
          numAct: item.subGoals[0].numAct,
          review: item.subGoals[0].review,
        });
        for (let i = 1; i < item.subGoals.length; i++) {
          const role = item.subGoals[i];
          data.push({
            name: "",
            manager: "",
            name_goal: role.name,
            numSeminars: role.numSeminars,
            numAtt: role.numAtt,
            outcome: role.outcome,
            impOutcome: role.impOutcome,
            outActivities: role.outActivities,
            numAct: role.numAct,
            review: role.review,
          });
        }
      });
    }
    console.log(data);
  }, [apps]);
  return (
    <Container style={{ marginTop: "20px", textAlign: "right" }}>
      <div
        style={{
          marginTop: "10px",
          marginRight: "20px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-start",
          }}
        >
          <ReactPrint componentRef={componentRef} />
          <CSVLink
            className="btn btn-success"
            data={data}
            headers={headers}
            style={{ marginLeft: "10px" }}
          >
            Export To Excel
          </CSVLink>
        </div>

        <Typography variant="h4">البرامج</Typography>
      </div>

      {errD && <Error error={errD} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          size="sm"
          style={{ fontWeight: "bold", fontSize: "20px" }}
          ref={componentRef}
        >
          <thead>
            <tr>
              <th>Action</th>
              <th>تقيم الانشطة</th>
              <th>عدد الانشطة</th>
              <th>الانشطة الغير مخطط لها</th>
              <th>التكلفة المستخدمة</th>
              <th>التكلفة المتفق عليها</th>
              <th>المخرجات التي تم تنفيذها</th>
              <th>الاولوية</th>

              <th>عدد الانشطة</th>
              <th>عدد الحضور</th>
              <th>مكان التنفيذ</th>
              <th>فترة التنفيذ</th>
              <th>اسماء الاهداف الفرعية</th>
              <th>مدير البرنامج</th>
              <th>اسم البرنامج</th>
            </tr>
          </thead>
          <tbody>
            {apps?.map((app, i) => (
              <tr>
                <td>
                  <DeleteOutlineIcon
                    fontSize="small"
                    style={{ color: "red" }}
                    onClick={() => handleDelete(app._id)}
                  />
                </td>
                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.review}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.numAct}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.outActivities}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.impCostSupplies + x?.impCostWages}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.costSupplies + x?.costWages}</li>
                    </ul>
                  ))}
                </td>
                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.impOutcome}</li>
                    </ul>
                  ))}
                </td>
                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.outcome}</li>
                    </ul>
                  ))}
                </td>

                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x.numSeminars}</li>
                    </ul>
                  ))}
                </td>
                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x.numAtt}</li>
                    </ul>
                  ))}
                </td>
                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      {x?.city?.split("-")?.map((z) => (
                        <li>{z}</li>
                      ))}
                    </ul>
                  ))}
                </td>
                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>
                        {x?.time1},{x?.year1}
                      </li>
                    </ul>
                  ))}
                </td>

                <td>
                  {app?.subGoals?.map((x) => (
                    <ul>
                      <li>{x?.name}</li>
                    </ul>
                  ))}
                </td>
                <td>{app.manager}</td>
                <td>{app.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Apps;

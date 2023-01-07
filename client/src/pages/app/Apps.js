import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Table from "react-bootstrap/Table";
import { Typography } from "@mui/material";
import {
  listAppsUserAction,
  deleteAppAction,
} from "../../redux/action/appAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/features/Loader";
import Error from "../../component/features/Error";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
const Apps = () => {
  const componentRef = useRef();
  const navigator = useNavigate();
  const dispatch = useDispatch();
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
  const deleteApp = useSelector((state) => state.deleteApp);
  const { app, error: errD, loading: loadD } = deleteApp;
  useEffect(() => {
    dispatch(listAppsUserAction());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteAppAction(id));
    dispatch(listAppsUserAction());
  };
  useEffect(() => {
    if (app) {
      alert("تم حذف البرنامج");
    }
  }, [app]);
  const listAppsByUser = useSelector((state) => state.listAppsByUser);
  const { apps, error, loading } = listAppsByUser;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
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
  const columnsDefs = [
    {
      headerName: "اسم البرنامج",
      field: `name`,
      sortable: true,
      filter: true,
    },
    {
      headerName: "مدير البرنامج",
      field: `manager`,
      sortable: true,
      filter: true,
    },
    {
      headerName: "الاهداف الفرعية",
      field: "subGoals",
      keyCreator: (params) => params.value.name,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
  const cellClickedListener = useCallback((e) => {
    console.log("cellClicked", e);
  });
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
              <th>عدد الانشطةغير مخطط لها</th>
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

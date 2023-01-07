import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./component/features/Footer";
import Header from "./component/features/Header";
import Add from "./pages/app/Add";
import AppDescription from "./pages/app/AppDescription";
import Apps from "./pages/app/Apps";
import Implement from "./pages/app/Implement";
import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import RegisterScreen from "./pages/user/Register";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./component/outside/ProtectedRoutes";
import Kpis from "./pages/app/Kpis";
import ListApps from "./pages/admin/ListApps";
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Router>
      <Header />
      <Routes>
        {/*  <Route path="/" element={<Home />} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/add" element={<Add />} />
          <Route path="/kpis" element={<Kpis />} />
          <Route path="/implement" element={<Implement />} />
          <Route
            path="/admin/apps"
            element={userInfo?.user?.isAdmin ? <ListApps /> : <Login />}
          />
          <Route path="/" element={userInfo?.user ? <Apps /> : <Login />} />
          <Route path="/apps/:id" element={<AppDescription />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

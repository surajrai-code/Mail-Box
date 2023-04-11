import { Routes, Route } from "react-router-dom";
import MyNavbar from "./Components/Navbar/Navbar";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import ComposeMail from "./Components/ComposeMail/ComposeMail";
import MailPage from "./Components/Mail/MailPage";
import InboxEmail from "./Components/ComposeMail/Inbox";
import SentEmail from "./Components/ComposeMail/Sent";
import ForgotPassword from "./Components/SignUp/ForgotPassword";
import "./App.css";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<SignUp />} exact />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<InboxEmail />} />
        <Route path="/:id" element={<MailPage />} />
        <Route path="/sent" element={<SentEmail />} />
      </Routes>
    </Fragment>
  );
}

export default App;

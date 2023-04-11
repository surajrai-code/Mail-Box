import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MailData from "../Mail/MailData";
import { NavLink } from "react-router-dom";

const InboxEmail = () => {
  const mails = useSelector((state) => state.mail.mailData);
  const email = localStorage.getItem("email");
  const inboxMail = mails.filter((mail) => mail.to === email);

  const mailItem = inboxMail.map((mail) => (
    <div>
      <NavLink to={`/inbox/${mail.id}`}>
        {" "}
        <MailData key={mail.id} mail={mail} toorFrom="From" />
      </NavLink>
    </div>
  ));

  return (
    <Container className="mt-5">
      <h1>inside inbox</h1>
      {mailItem}
    </Container>
  );
};

export default InboxEmail;

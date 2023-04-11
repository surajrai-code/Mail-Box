import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import MailData from "../Mail/MailData";

const SentEmail = () => {
  const mails = useSelector((state) => state.mail.mailData);
  const email = localStorage.getItem("email");
  const sentMail = mails.filter((mail) => mail.from === email);

  const mailItem = sentMail.map((mail) => (
    <div>
      {" "}
      <MailData key={mail.id} mail={mail} toorFrom="From" />
    </div>
  ));

  return (
    <Container className="mt-5">
      <h1>inside SentBox</h1>
      {mailItem}
    </Container>
  );
};

export default SentEmail;

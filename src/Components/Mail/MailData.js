import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { deleteMail } from "../../store/MailAction";
import { NavLink } from "react-router-dom";

const MailData = (props) => {
  const dispatch = useDispatch();
  const deleteMailHandler = (event) => {
    event.preventDefault();
    dispatch(deleteMail(props.mail));
  };
  return (
    <Fragment>
      <Container>
        <Row>
          <NavLink to={`/${props.mail.id}`}>
            {props.toorFrom === "From" && props.mail.read && (
              <Col xs={1}>
                <iconify-icon
                  icon="ri:checkbox-blank-circle-fill"
                  style={{ color: "blue" }}
                ></iconify-icon>
              </Col>
            )}
            <Col xs={1}>{props.toorFrom}</Col>
            <Col xs={3}>
              <b>
                {props.toorFrom === "From" ? props.mail.from : props.mail.to}
              </b>
            </Col>
          </NavLink>
          <Col xs={5}>{props.mail.title}</Col>
          <Col xs={2}>
            <Button
              className="mb-2"
              variant="danger"
              onClick={deleteMailHandler}
            >
              Delete
            </Button>
          </Col>
          <hr />
        </Row>
      </Container>
    </Fragment>
  );
};

export default MailData;

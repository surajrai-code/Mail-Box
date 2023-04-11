import { Fragment, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/Auth";
import "./SignUp.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZ4IrwQnC8yBVkOKUyVwPfeFT5ZqQt0L8";
    } else {
      if (passwordInputRef.current.value === confirmPasswordRef.current.value) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZ4IrwQnC8yBVkOKUyVwPfeFT5ZqQt0L8";
      } else {
        alert("password not matched");
        return;
      }
    }
  fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(
          authActions.updateAuthInfo({
            token: data.idToken,
            email: emailInputRef.current.value,
          })
        );
        navigate("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Form onSubmit={submitHandler} className="auth mb-3">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emailInputRef}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>PassWord:</Form.Label>
            <Form.Control
              type="password"
              placeholder=" password"
              ref={passwordInputRef}
              required
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3" controlId="confirm password">
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
          )}
        </div>
        <div>
          <Button variant="primary" type="submit">
            {isLogin ? "Login" : "Sign up"}
          </Button>
          <br />
          {isLogin && (
            <p className="text-center">
              <NavLink to="/forgotPassword">Forget password?</NavLink>
            </p>
          )}
        </div>
      </Form>
      <div className="text-center">
        <Button variant="secondary" onClick={switchAuthHandler}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </Button>
      </div>
    </Fragment>
  );
};

export default SignUp;

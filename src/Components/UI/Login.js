import React, { useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { authAction } from "../store/Auth-slice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { useDispatch } from "react-redux";

const Login = () => {
  console.log("insideAuth");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState();
  const emailInputref = useRef();
  const passwordInputref = useRef();
  const inputConfirmPasswordRef= useRef();
  const navigate = useNavigate();

  const [loginState, setlogingState] = useState(false);
  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async(event) => {
    event.preventDefault();

    const enteredEmail = emailInputref.current.value;
    const enteredPassword = passwordInputref.current.value;
    const confirmPassword = inputConfirmPasswordRef.current.value;

    //validation
    setisLoading(true);
  
    let url
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRorahRJ_juKatl8aQXmkip1wxxy28S84";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRorahRJ_juKatl8aQXmkip1wxxy28S84";
    }
    if(!isLogin){
      if(enteredPassword === confirmPassword){
        return  }
      }
  try{
    const res = await fetch(url ,{
      method : "POST",
      body :JSON.stringify({
          email: enteredEmail,
          password : enteredPassword
      }),
      headers :{
           'Content-type':'application/json'
      }  
  })
  if(res.ok){
      const data = await res.json();
      console.log(data)
      localStorage.setItem('idToken',data.idToken)
      localStorage.setItem('email',data.email)
      emailInputref.current.value=""
      passwordInputref.current.value=""
      inputConfirmPasswordRef.current.value=''
      if(!isLogin){
          inputConfirmPasswordRef.current.value=""
          alert("sign up successfully")
      }else{
          alert("Login SuccessFully")
          navigate("/compose");
          dispatch(authAction.login(data.idToken))
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);
        

      }
  }else{
    let error = "authentication failed"
    throw new Error(error)
  }
}catch(error){
  console.log(error.message)
  alert(error.message)
}
};

  return (
    <div className="login-main" >
      <Form onSubmit={submitHandler}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <Form.Group className="mb-3" htmlFor="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailInputref} id="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" htmlFor="password">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passwordInputref} id="password" type="password" placeholder="Password" />
          <Form.Group className="mb-3" htmlFor="confirm-password">
            <Form.Label >Confirm Password</Form.Label>
            <Form.Control
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              ref={inputConfirmPasswordRef} required
            />
          </Form.Group>
        </Form.Group>
        {/* {!isLogin && (
          <Form.Group className="mb-3" htmlFor="confirm-password">
            <Form.Label >Confirm Password</Form.Label>
            <Form.Control
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              ref={inputConfirmPasswordRef} required
            />
          </Form.Group>
        )} */}
        <Button variant="primary" type="submit" >
          {isLogin ? "Login" : "SignUP"}
        </Button>
      </Form>
      <Button
        onClick={switchAuthModeHandler}
        style={{
          
          fontWeight: "bold",
          marginTop: 20 + "px",
          marginBottom: 20 + "px",
          width: 90 + "%",
        }}
        variant="success"
      >
        {isLogin ? "Click Here To SignUp" : "Click Here to Log In"}
      </Button>
    </div>
  );
};
export default Login;
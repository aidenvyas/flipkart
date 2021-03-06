import React from "react";
import {Redirect} from 'react-router-dom';
import InputBox from "./UI/InputBox";
import { Button, Form } from "reactstrap";
let values = {};
function handleChangeEvent(event) {
  values[event.target.name] = event.target.value;
}

export default props => {
  
  if(props.logged){
    return <Redirect to="/"/>
  }
  return(
  <div>
    <h2>Login</h2>
    <Form>
      <InputBox
        name="username"
        type="text"
        label="UserName"
        changeHandle={handleChangeEvent}
      />
      <InputBox
        name="password"
        type="password"
        label="Password"
        changeHandle={handleChangeEvent}
      />
      <Button
        onClick={() => {
          props.dispatchers.loginAPI(values.username, values.password);
        }}
      >
        Login
      </Button>
    </Form>
  </div>
      )};

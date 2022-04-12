import { TextField } from "../../ui/textField";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import css from "./index.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserEmail } from "../../hooks";
import { checkEmail } from "../../api-calls";
import { useLocalStorage } from "../../hooks";

export function LogIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useUserEmail();
  const [storagedUser, setUserInStorage] = useLocalStorage("user-data", {});

  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const response = await checkEmail(email);
    /*  console.log("user email :", userData);
    console.log("response", response); */

    const res = {
      email: response.exists.email,
      fullname: response.exists.fullname,
      userId: response.id,
      logged: false,
    };
    /*  console.log("res", res); */

    if (response.exists) {
      console.log(response);
      setUserData(res);
      setUserInStorage(...storagedUser, res);
      navigate("/log-password");
    } else {
      setUserData({
        email: email,
        fullname: null,
        userId: null,
        logged: false,
      });
      navigate("/data");
    }
  }

  return (
    <form onSubmit={submitHandler} className={css.container}>
      <Text children="Create an account" style={css.title} />
      <TextField
        labelStyle={css.label}
        children="Email"
        inputStyle={css.input}
        container_style={css.text_container}
        name="email"
        type="email"
      />
      <div className={css.button_cont}>
        <button className={css.button}>Log in</button>
      </div>
    </form>
  );
}

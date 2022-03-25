import { TextField } from "../../ui/textField";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import css from "./index.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserEmail } from "../../hooks";
import { checkEmail } from "../../api-calls";

export function LogIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useUserEmail();
  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const response = await checkEmail(email);
    // uso un atomo para recuperarlo en la siguiente pantalla
    console.log("user emaikl :", userData);
    const res = {
      email: email,
      fullname: email,
    };
    if (response.exists) {
      setUserData(res);
      navigate("/log-password");
    } else {
      setUserData({ email: email, fullname: null });
      navigate("/data");
    }
  }
  return (
    <form onSubmit={submitHandler} className={css.container}>
      <Text children="Create an account" style={css.title} />
      <TextField
        labelStyle={css.label}
        children="Name"
        inputStyle={css.input}
        container_style={css.text_container}
        name="email"
        type="email"
      />
      <div className={css.button_cont}>
        <button className={css.button}>Ingresar</button>
      </div>
    </form>
  );
}

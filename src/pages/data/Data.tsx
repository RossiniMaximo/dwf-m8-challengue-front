import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../../ui/text";
import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";
import { useUserData, useCheckLogStatus, useLocalStorage } from "../../hooks";
import { createUser, updateUser } from "../../api-calls";
import css from "./data.css";

export function Data() {
  const navigate = useNavigate();
  const [storagedUserData, setStoragedUserData] = useLocalStorage(
    "user-data",
    {}
  );
  const [user, setUser] = useUserData();
  const { setLoged } = useCheckLogStatus();
  async function handleSubmit(e) {
    e.preventDefault();
    const fullname = e.target.name.value;
    /* console.log("fullname", fullname); */
    const email = user.email;
    setUser({ ...user, email, fullname });
    const password = e.target.password.value;
    const repetead_password = e.target.repetead_password.value;

    const body = {
      fullname: fullname,
      email: email,
      password: password,
    };
    if (user.logged == false && password == repetead_password) {
      const res = await createUser(body, password);
      console.log("res", res);
      if (res) {
        setStoragedUserData({
          email: res.email,
          fullname: res.fullname,
          userId: res.userId,
          logged: true,
        });
        setLoged(true);
        navigate("/");
      }
    } else {
      if (password == repetead_password) {
        const update = await updateUser(body);
        console.log("update user :", update);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={css.data_container}>
      <Text children={"Private info"} style={css.title} />
      <div className={css.textField_container}>
        <TextField
          children="NAME"
          container_style={css.container_style}
          labelStyle={css.labelStyle}
          inputStyle={css.inputStyle}
          type="text"
          name="name"
          placeholder={user?.fullname}
        />
      </div>
      <div className={css.password_inputs__container}>
        <TextField
          children="PASSWORD"
          container_style={css.container_style}
          labelStyle={css.labelStyle}
          inputStyle={css.inputStyle}
          type="password"
          name="password"
        />
        <TextField
          children="REPEAT PASSWORD"
          container_style={css.container_style}
          labelStyle={css.labelStyle}
          inputStyle={css.inputStyle}
          type="password"
          name="repetead_password"
        />
      </div>
      <div className={css.button_container}>
        <Button children="Save" style={css.button} />
      </div>
    </form>
  );
}

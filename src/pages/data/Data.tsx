import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../../ui/text";
import { TextField } from "../../ui/textField";
import { useUserData, useCheckLogStatus, useLocalStorage } from "../../hooks";
import { createUser, updateUser } from "../../api-calls";
import { PopUp } from "../../components/PopUp";
import css from "./data.css";

export function Data() {
  const navigate = useNavigate();
  const [storagedUserData, setStoragedUserData] = useLocalStorage(
    "user-data",
    {}
  );
  const [user, setUser] = useUserData();
  const [flag, setFlag] = useState(false);
  const { setLoged } = useCheckLogStatus();
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info("This page is reloaded");
    if (storagedUserData) {
      console.log("storaged data in local storage", storagedUserData);
      setUser(storagedUserData);
    }
  }
  function handleFlag() {
    setFlag(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("evenrto", e);
    const fullname = e.target.name.value;
    /* console.log("fullname", fullname); */
    const email = user.email;
    setUser({ ...user, email, fullname });
    const password = e.target.password.value;
    const repetead_password = e.target.repetead_password.value;
    console.log("password", password);
    console.log("repetead password", repetead_password);

    const body = {
      fullname: fullname,
      email: email,
      password: password,
    };
    if (user.logged == false && password == repetead_password) {
      const res = await createUser(body, password);
      console.log("res", res);
      if (res) {
        setUser({ ...user, userId: res.id });
        setStoragedUserData({
          email: res.email,
          fullname: res.fullname,
          userId: res.id,
          logged: true,
        });
        setLoged(true);
        navigate("/");
      }
    } else {
      if (password == repetead_password) {
        const update = await updateUser(body);
        navigate("/");
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
        <button onClick={handleFlag} className={css.button}>
          Save
        </button>
      </div>
      {flag ? <PopUp style={css.popup} text={"Password updated!"} /> : ""}
    </form>
  );
}

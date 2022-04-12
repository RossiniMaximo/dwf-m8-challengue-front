import React, { useEffect } from "react";
import css from "./index.css";
import { Button } from "../../ui/button";
import { TextField } from "../../ui/textField";
import { Text } from "../../ui/text";
import { useCreateToken } from "../../hooks";
import { useUserData } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useCheckLogStatus } from "../../hooks";

import { useLocalStorage } from "../../hooks";

export function PutPassword() {
  const navigate = useNavigate();
  const { login } = useCreateToken();
  const { logState } = useCheckLogStatus();
  const { setLoged } = useCheckLogStatus();
  const [userStoraged, setUserStoraged] = useLocalStorage("user-data", {});

  const [userData, setUserData] = useUserData();
  console.log("userdata", userData);
  const email = userData.email;
  async function handleSubmit(e) {
    e.preventDefault();
    const pass = e.target.password.value;
    const authRes = await login(email, pass);
    /* console.log("authRes", authRes); */

    if (authRes) {
      setLoged(true);
      setUserStoraged({
        ...userStoraged,
        logged: true,
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log("cambio el estado del usuario", logState);
  }, [logState]);
  return (
    <form onSubmit={handleSubmit} className={css.container}>
      <Text
        children="Your password is going to be hashed so no one can see or know it"
        style={css.title_password}
      />
      <TextField
        labelStyle={css.label}
        children="Password"
        inputStyle={css.input}
        type="password"
        container_style={css.text_container}
        name="password"
      />
      <div className={css.button_cont}>
        <button className={css.button}>Send</button>
      </div>
    </form>
  );
}

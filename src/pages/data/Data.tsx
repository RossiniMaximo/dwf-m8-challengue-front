import React, { useEffect } from "react";
import { Text } from "../../ui/text";
import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";
import css from "./data.css";
import { useUserData } from "../../hooks";
import { useCheckLogStatus } from "../../hooks";
import { createUser } from "../../api-calls";

// Estoy teniendo problemas para dar de alta  al usuario en la base de datos

export function Data() {
  const [user, setUser] = useUserData();
  const { logState } = useCheckLogStatus();
  const { setLoged } = useCheckLogStatus();
  async function handleSubmit(e) {
    e.preventDefault();
    const fullname = e.target.name.value;
    console.log("fullname", fullname);
    const email = user.email;
    setUser({ email, fullname });
    const password = e.target.password.value;
    const repetead_password = e.target.repetead_password.value;
    if (logState == false) {
      console.log("user antres del cerate", user);
      const res = await createUser(user, password);
      console.log("res", res);
      if (res) {
        setLoged(true);
      }
    }
  }

  useEffect(() => {
    console.log("user", user);
  }, [user]);
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
        <Button children="Save" style={css.button} />
      </div>
    </form>
  );
}

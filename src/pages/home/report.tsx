import React, { useEffect } from "react";
import { reportInfo } from "../../api-calls";
import { usePetId } from "../../hooks";
import { Button } from "../../ui/button";
import { TextField } from "../../ui/textField";
import img from "../../images/background.png";

import css from "./home.css";
const props = {
  children: "Your name",
  container_style: css.container_style,
  labelStyle: css.label,
  inputStyle: css.input,
  type: "text",
  name: "reporter_name",
};
const props2 = {
  children: "Phone number",
  container_style: css.container_style,
  labelStyle: css.label,
  inputStyle: css.input,
  type: "text",
  name: "reporter_phone_number",
};
export function SubmitInfo() {
  const [petId, setPetId] = usePetId();
  async function handleSubmit(e) {
    e.preventDefault();
    // Tengo que mandarle el petid tambien
    const name = e.target.reporter_name.value;
    const phone = e.target.reporter_phone_number.value;
    const text = e.target.info.value;
    const pet = {
      name,
      phone,
      text,
      petId,
    };
    const res = await reportInfo(pet);
  }
  return (
    <form onSubmit={handleSubmit} style={{ backgroundImage: `url(${img})` }}>
      <TextField {...props} />
      <TextField {...props2} />
      <div className={css.text_area__container}>
        <label className={css.label}>Information</label>
        <textarea className={css.textarea} name="info"></textarea>
      </div>
      <div className={css.button_container}>
        <button className={css.button}>Enviar</button>
      </div>
    </form>
  );
}
// Me falta hacer el textfield para que se pueda poner la info para reporartar
//  y despues hacer la llamada a la api

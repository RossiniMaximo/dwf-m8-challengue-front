import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePetId } from "../../hooks";
import css from "./petCard.css";

export function PetCard(props) {
  // El pet id lo tendria que setear en un atomo desde aca asi desde report card
  // lo puedo usar accediendo al mismo atomo

  const [petId, setPetId] = usePetId();
  const navigate = useNavigate();
  function handleClick(e) {
    // Desde aca debo hacer la llamada a la api y enviarle los parametros necesario para mandar el mail.
    console.log("props.id de el pet de  la card tocada ", props);
    setPetId(props.petId);
    navigate("/report-info");
  }

  return (
    <form className={css.main_container}>
      <div className={css.img_container}>
        <img className={css.img} src={props.imgURL} alt="" />
      </div>
      <div className={css.text_container}>
        <div className={css.upper_text}>
          <h5 className={css.name}>{props.petname}</h5>
        </div>
        <div onClick={handleClick} className={css.lower_text}>
          <p className={css.report_text}>REPORTAR</p>
          <p className={css.report_text}>INFORMACIÓN</p>
        </div>
      </div>
    </form>
  );
}

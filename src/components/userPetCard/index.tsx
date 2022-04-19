import React from "react";
import css from "./userPetCard.css";
import { useNavigate } from "react-router-dom";
import { usePet, usePetId, useUpdateCheck } from "../../hooks";
import trashIcon from "../../images/garbage.png";
import { deletePet } from "../../api-calls";

export function UserPetCard(props) {
  const [petId, setPetId] = usePetId();
  const [petName, setPetName] = usePet();
  const navigate = useNavigate();
  const [update, setUpdate] = useUpdateCheck();
  function handler() {
    setPetId(props.petId);
    setPetName({ ...petName, petName: props.petName });
    setUpdate(true);
    navigate("/report-pet");
  }
  async function deleteHandler() {
    const res = await deletePet(props.petId);
    console.log("res", res);
    window.location.reload();

    return res;
  }
  return (
    <div className={css.main_container}>
      <div className={css.img_container}>
        <img src={props.imgURL} className={css.img} />
      </div>
      <div className={css.text_container}>
        <p className={css.text}>{props.petName}</p>
        <img onClick={deleteHandler} src={trashIcon} className={css.icon} />
        <p onClick={handler} className={css.text}>
          Update Pet
        </p>
      </div>
    </div>
  );
}

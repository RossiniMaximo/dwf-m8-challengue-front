import React, { useEffect, useState } from "react";
import { Text } from "../../ui/text";
import { TextField } from "../../ui/textField";
import { MapComponent } from "../../components/map";
import css from "./report.css";
import { DropzoneComponent } from "../../components/dropzone";
import { reportPet, updatePet } from "../../api-calls";
import {
  useLocalStorage,
  usePetId,
  usePetState,
  useUserData,
} from "../../hooks";
import { useUpdateCheck } from "../../hooks";
import { PopUp } from "../../components/PopUp";

export function ReportPage() {
  const [user, setUser] = useUserData();
  const [pet, setPet] = usePetState();
  const [update, setUpdate] = useUpdateCheck();
  const [petId, setPetId] = usePetId();
  const [storagedUserData, setStoragedUserData] = useLocalStorage(
    "user-data",
    {}
  );
  useEffect(() => {
    console.log("pet", pet);
    setPet({ ...pet });
    handleClick();
  }, [pet.petName]);
  const [createPetFlag, setCreatePetFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [formData, setFormData] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    const petName = e.target.petName.value;
    console.log("petName target value  : ", petName);
    setPet({ ...pet, petName: petName });
  }

  function handleClick() {
    if (pet.petName != "" && update == false) {
      handleCreatePet();
      setCreatePetFlag(false);
    } else if (pet.petName != "" && update == true) {
      handleUpdatePet();
      setUpdateFlag(false);
    }
  }
  async function handleCreatePet() {
    const userId = user.userId;
    const res = await reportPet(pet, userId);
    console.log("res del reportpet", res);
    setCreatePetFlag(true);
    return res;
  }

  async function handleUpdatePet() {
    const update = await updatePet(pet, petId);
    setUpdate(false);
    setUpdateFlag(true);
    return update;
  }
  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setFormData({
      ...formData,
      mapbox: data,
    });
  }

  return (
    <form onSubmit={handleSubmit} className={css.container}>
      <Text style={css.title} children="Report pet" />
      <TextField
        children="name"
        type="text"
        name="petName"
        placeholder={update ? pet.petName : ""}
        container_style={css.label_container}
        inputStyle={css.input}
        labelStyle={css.label}
      />
      <div className={css.img_container}>
        <DropzoneComponent />
      </div>
      <div className={css.map_container}>
        <MapComponent onChange={handleMapboxChange} />
      </div>
      <div>
        {updateFlag ? <PopUp style={css.popup} text={"Pet Updated!"} /> : ""}
      </div>
      {!createPetFlag && !updateFlag ? (
        <div className={css.button_container}>
          <button className={css.button}>Send</button>
          <div className={css.lower_text}>
            Double click on Send button to report your pet!
          </div>
        </div>
      ) : (
        <div>
          {createPetFlag ? (
            <PopUp style={css.popup} text={"Pet Reported!"} />
          ) : (
            ""
          )}
        </div>
      )}
    </form>
  );
}

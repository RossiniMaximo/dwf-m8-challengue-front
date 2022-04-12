import React, { useState } from "react";
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
  const [formData, setFormData] = useState({});
  const [pet, setPet] = usePetState();
  const [update, setUpdate] = useUpdateCheck();
  const [petId, setPetId] = usePetId();
  const [storagedUserData, setStoragedUserData] = useLocalStorage(
    "user-data",
    {}
  );
  const [flag, setFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info("This page is reloaded");
    if (storagedUserData) {
      console.log("storaged data in local storage", storagedUserData);
      setUser(storagedUserData);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const petName = e.target.petname.value;
    setPet({ ...pet, petName: petName });
    /*  console.log("update", update); */

    if (pet.petName != "" && update == false) {
      handleCreatePet();
    } else if (pet.petName != "" && update == true) {
      handleUpdatePet();
      setUpdateFlag(false);
    }
  }
  function handleMapboxChange(data) {
    setFormData({
      ...formData,
      mapbox: data,
    });
  }

  async function handleCreatePet() {
    const userId = user.userId;
    if (userId) {
      const res = await reportPet(pet, userId);
      console.log("res del reportpet", res);
      setFlag(true);
      return res;
    }
  }

  async function handleUpdatePet() {
    await updatePet(pet, petId);
    setUpdate(false);
    setUpdateFlag(true);
  }

  return (
    <form onSubmit={handleSubmit} className={css.container}>
      <Text style={css.title} children="Report pet" />
      <TextField
        children="name"
        type="text"
        name="petname"
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
      {!flag && !updateFlag ? (
        <div className={css.button_container}>
          <button className={css.button}>Send</button>
        </div>
      ) : (
        <div>
          {flag ? <PopUp style={css.popup} text={"Pet Reported!"} /> : ""}
        </div>
      )}
    </form>
  );
}

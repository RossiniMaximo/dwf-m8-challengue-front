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
import img from "../../images/background.png";

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
    if (update) {
      setUpdateFlag(true);
    } else {
      setCreatePetFlag(true);
    }
  }, [pet.petName]);
  const [createPetFlag, setCreatePetFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [formData, setFormData] = useState({});
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    const petName = e.target.petName.value;
    console.log("petName target value  : ", petName);
    setPet({ ...pet, petName: petName });
    if (updateFlag && petName) {
      const updated = handleUpdatePet(petName);
      if (updated) {
        setUpdated(true);
      }
    }
    if (createPetFlag && petName) {
      const created = handleCreatePet(petName);
      console.log("created:", created);

      if (created) {
        setCreated(true);
      }
    }
  }

  async function handleCreatePet(petName) {
    const userId = user.userId;
    const res = await reportPet({ ...pet, petName: petName }, userId);
    console.log("res del reportpet", res);
    setCreatePetFlag(true);
    return res;
  }

  async function handleUpdatePet(petName) {
    const update = await updatePet({ ...pet, petName: petName }, petId);
    console.log("UPDATE", update);

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
    <form
      style={{ backgroundImage: `url(${img})` }}
      onSubmit={handleSubmit}
      className={css.container}
    >
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
        {updated ? <PopUp style={css.popup} text={"Pet Updated!"} /> : ""}
      </div>
      <div className={css.button_container}>
        <button className={css.button}>Send</button>
      </div>
      <div>
        {created ? <PopUp style={css.popup} text={"Pet Reported!"} /> : ""}
      </div>
      )
    </form>
  );
}

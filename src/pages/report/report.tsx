import React, { useState } from "react";
import { Text } from "../../ui/text";
import { TextField } from "../../ui/textField";
import { MapComponent } from "../../components/map";
import css from "./report.css";
import { DropzoneComponent } from "../../components/dropzone";
import { reportPet, updatePet } from "../../api-calls";
import { usePetId, usePetState, useUserData } from "../../hooks";
import { useUpdateCheck } from "../../hooks";
import { getUserPets } from "../../api-calls";

export function ReportPage() {
  const [user, setUser] = useUserData();
  const [formData, setFormData] = useState({});
  const [pet, setPet] = usePetState();
  const [update, setUpdate] = useUpdateCheck();
  const [petId, setPetId] = usePetId();
  async function handleSubmit(e) {
    e.preventDefault();
    const petName = e.target.petname.value;
    setPet({ ...pet, petName: petName });
    /*  console.log("update", update); */

    if (pet.petName != "" && update == false) {
      handleCreatePet();
    } else if (pet.petName != "" && update == true) {
      // handleUpdatePet
      await updatePet(pet, petId);
      setUpdate(false);
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
    const res = await reportPet(pet, userId);
    console.log("res del reportpet", res);

    return res;
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
      <div className={css.button_container}>
        <button className={css.button}>Send</button>
      </div>
    </form>
  );
}

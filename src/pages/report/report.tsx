import React, { useEffect, useState } from "react";
import { Text } from "../../ui/text";
import { TextField } from "../../ui/textField";
import { Button } from "../../ui/button";
import { MapComponent } from "../../components/map";
import css from "./report.css";
import { usePetState } from "../../hooks";
import { DropzoneComponent } from "../../components/dropzone";
import { reportPet } from "../../api-calls";

export function ReportPage() {
  const [formData, setFormData] = useState({});
  const [pet, setPet] = usePetState();
  async function handleSubmit(e) {
    e.preventDefault();
    const petName = e.target.petname.value;
    setPet({ ...pet, petName: petName });
  }

  /* useEffect(() => {
    console.log("cambio el pet", pet);
  }, [pet]); */

  function handleMapboxChange(data) {
    setFormData({
      ...formData,
      mapbox: data,
    });
  }

  async function handleCreatePet() {
    const res = await reportPet(pet);
    console.log("data del reportPet", res);
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
        <button onClick={handleCreatePet} className={css.button}>
          enviar
        </button>
      </div>
    </form>
  );
}
// La llamada llega a la API pero no da respuesta de vuelta

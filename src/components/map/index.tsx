import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import css from "./map.css";
import { Button } from "../../ui/button";
import { TextField } from "../../ui/textField";
import { usePetState } from "../../hooks";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWF4emkiLCJhIjoiY2t5bHJqdzRpMHczNjJ2cGtzODc3cnd0eSJ9.X4K8_sRROGgfFfMlr56mDA",
});
type mapboxSearchProps = {
  onChange?: (any) => any;
};

export function MapComponent(props: mapboxSearchProps) {
  const { onChange } = props;
  const [query, setQuery] = useState("");
  const initialCoords: any = [-0.481747846041145, 51.3233379650232];
  const [coords, setCoords] = useState(initialCoords);
  const [pet, setPet] = usePetState();

  async function search() {
    const res = await fetch(
      "https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=" +
        query +
        "&format=json"
    );
    const data = await res.json();
    /*  console.log("data de la llamada a la API", data[0]); */
    const lat = parseFloat(data[0].lat);
    console.log("lat", lat);

    const lon = parseFloat(data[0].lon);
    const newCoords = [lon, lat];
    setCoords(newCoords);
    setPet({
      ...pet,
      lat: lat,
      lng: lon,
    });

    if (onChange) {
      onChange({ query: query, coords: coords });
    }
  }

  function inputChangeHandler(e) {
    setQuery(e.target.value);
  }

  function keydownInputHandler(e) {
    // si no es con form, tengo que agregar esto
    e.preventDefault();
    if (e.key == "Enter") {
      search();
    }
  }

  return (
    <div className={css.map_container}>
      <Map
        className={css.map}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "200px",
          width: "300px",
        }}
        zoom={[15]}
        center={coords}
        movingMethod="easeTo"
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={coords} />
        </Layer>
      </Map>
      <div className={css.text_container}>
        <TextField
          container_style={css.container_textfield}
          labelStyle={css.label}
          inputStyle={css.input}
          type={"text"}
          name={"location"}
          children={"Search location"}
          value={query}
          onChange={inputChangeHandler}
        />
      </div>
      <div className={css.button_container}>
        <button className={css.button} onClick={search} type="button">
          Search
        </button>
      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./index.css";
import { usePetState } from "../../hooks";

export function DropzoneComponent() {
  const [pet, setPet] = usePetState();
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    /* console.log("file", file); */

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      /* console.log(event.target.result); */
      setPet({ ...pet, img: event.target.result });
    };
    const res = fileReader.readAsDataURL(file);
    /*  console.log("res del fileReader", res); */
    /*  setPet({ ...pet, img: res }); */
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  const thumbs = files.map((file) => (
    <div className={css.img_container} key={file.name}>
      <img className={css.img} src={file.preview} alt={file.name} />
    </div>
  ));
  useEffect(
    () => () => {
      /* console.log("files", files); */
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [files]
  );

  return (
    <section>
      <p className={css.title}>Drag an image or click to choose one</p>
      <div className={css.container} {...getRootProps()}>
        <input className={css.input} {...getInputProps()} />
        <aside className={css.aside}>{thumbs}</aside>
      </div>
    </section>
  );
}

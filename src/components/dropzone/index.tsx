import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./index.css";
import { usePetState } from "../../hooks";

export function DropzoneComponent() {
  const [pet, setPet] = usePetState();
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    /*  console.log("acceptedFiles", acceptedFiles); */
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    /*console.log(" acceptedFiles[0].path", acceptedFiles[0].path); */
    setPet({ ...pet, img: acceptedFiles[0].path });
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
      files.forEach((file) => URL.revokeObjectURL(file.preview));
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

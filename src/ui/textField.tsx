import { prependListener } from "process";
import React from "react";

export function TextField(props) {
  return (
    <div className={props.container_style}>
      <label className={props.labelStyle}>{props.children}</label>
      <input
        className={props.inputStyle}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
}

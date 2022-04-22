import React from "react";

export function Button(props) {
  return (
    <button onClick={props.clickHandler} className={props.style} type="button">
      {props.children}
    </button>
  );
}

import React from "react";

export function Button(props) {
  return (
    <button onClick={props.clickHandler} className={props.style}>
      {props.children}
    </button>
  );
}

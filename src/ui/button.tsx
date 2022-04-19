import React from "react";

export function Button(props) {
  return (
    <div onClick={props.clickHandler} className={props.style}>
      {props.children}
    </div>
  );
}

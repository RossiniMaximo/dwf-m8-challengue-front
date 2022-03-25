import React from "react";

export function Text(props) {
  return <h4 className={props.style}>{props.children}</h4>;
}

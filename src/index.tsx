import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { MyRouter } from "./router";

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <RecoilRoot>
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
    </RecoilRoot>
  </Suspense>,
  document.getElementById("root")
);

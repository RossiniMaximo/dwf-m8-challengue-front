import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/home/Home";
import { Data } from "../pages/data/Data";
import { ReportedPetsPage } from "../pages/reported/index";
import { ReportPage } from "../pages/report/report";
import { LogIn } from "../pages/signin";
import { PutPassword } from "../pages/signin/password";
import { SubmitInfo } from "../pages/home/report";
import { DropzoneComponent } from "../components/dropzone";

export function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/data" element={<Data />}></Route>
        <Route path="/report-pet" element={<ReportPage />}></Route>
        <Route path="/reported" element={<ReportedPetsPage />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/log-password" element={<PutPassword />}></Route>
        <Route path="/report-info" element={<SubmitInfo />}></Route>
      </Route>
      <Route path="/test" element={<DropzoneComponent />}></Route>
    </Routes>
  );
}

import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";

import Router from "./Router";

import "./style.css";

const App = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={"Loading"}>
        <Router />
      </Suspense>
    </RecoilRoot>
  );
};

export default App;

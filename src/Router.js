import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Stocks from "./pages/Stocks";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/stocks" component={Stocks} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

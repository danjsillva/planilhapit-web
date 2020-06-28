import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import StocksTable from './components/StocksTable'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={StocksTable} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const onUpdate = () => window.scrollTo(0, 0);

const Router = () => {
  return (
    <BrowserRouter onUpdate={onUpdate}>
      <Switch>
        {/* insert pages here */}
        {/* <Route exact path='/' component={/*somecomponent*/} />*/}
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<Router />, document.getElementById("react"));

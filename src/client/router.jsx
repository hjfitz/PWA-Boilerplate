import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from './components/layout';
import { Home } from './components/pages';

const onUpdate = () => window.scrollTo(0, 0);

const app = (
  <BrowserRouter onUpdate={onUpdate}>
    <Layout>
      {/* Routes go here */}
      <Route exact path="/" component={Home} />
    </Layout>
  </BrowserRouter>
);

const entry = document.getElementById('react');

ReactDOM.render(app, entry);

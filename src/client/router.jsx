/**
 * main imports
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 *  local imports
 */
import { Layout } from './components/Layouts';
import { Home } from './components/Pages';

/**
 * CSS imports
 */
import './styles/main';

/**
 * import service worker
 * uncommented when pushing to prod
 */
// import './worker';

// scroll the app to the top on a route change
const onUpdate = () => window.scrollTo(0, 0);

// our client-side router
const router = (
  <BrowserRouter onUpdate={onUpdate}>
    <Layout>
      <Switch>
        {/* Routes go here */}
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

const entry = document.getElementById('react');

ReactDOM.render(router, entry);

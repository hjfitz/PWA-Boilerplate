# React Boilerplate - _with_ JSX
An express.js server with additional tooling set up for react.js. Ideal for starting off a personal project, or a hackathon just right

## Setup
Install the dependencies. This is done with `yarn` (recommended), or plain ol' `npm install` (also pretty good).

### React
React is set up under `src/client` with `react-router-4` for client-side routing. 

- An example router is setup under `src/client/router.jsx`
- A default layout is setup under `src/client/components/layout.jsx`
- Pages can be found under `src/client/components/pages`
- Webpack is setup to resolve files with the following extensions:
  - `.jsx`
  - `.js`
  - `.css`
  - `.json`
  - Files with these extensions can be imported as `import { x } from './myFile'` and webpack will worry about the extension.

## Scripts

### Running the server
This is an express server, with the HTTP server exposed (under `bin/www`). You can easily swap this out for a HTTPS server and include your certificates. Running the app is simple:

- `npm start`

#### Heroku

If you're deploying to Heroku - a Procfile is setup for you. Use `heroku local`. The package [`local-env-var`](https://www.npmjs.com/package/local-env-var) is included to load from your `.env`.

### Building
Because we're using React with JSX, the JSX has to be built. A polyfill (set up to ie >= 11) is provided.

- `npm build`

If you want to keep building after a file's saved:

- `npm run watch`

## I've cloned this from git, how do I attach it to my own?

1. Remove the .git folder - `npm run clean`
2. Initialise the folder as a git repository - `git init`
3. Remotely add your repo - `git remote add origin ${path-to-git-repo}`
4. Push! `git push -u origin master`

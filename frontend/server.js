const path = require("path");
const express = require("express");
require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom'; 
import {hydrate} from 'react-dom';
import App from './src/app';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import  rootReducer  from './src/reducers/index'
import ReactDOMServer from "react-dom/server"


const store = createStore(rootReducer, applyMiddleware(thunk))

const app = express();

delete process.env.BROWSER;

const buildPath = path.join(__dirname, 'dist',"index.html");

app.use( express.static(path.join(__dirname, 'dist')));



app.get('/',(req, res) => {
  res.sendFile(buildPath);
})
const PORT = 8082;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

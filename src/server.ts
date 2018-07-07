const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('../dist/server/main');
import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

enableProdMode();

const PORT     = process.env.PORT || 4000;
const DIST_DIR = join(__dirname, '..', 'dist');

console.log('Starting express server');
const app = express();
const template = readFileSync(join(DIST_DIR, 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  const newOptions = {
    document: template,
    url: options.req.url
  };

  renderModuleFactory(AppServerModuleNgFactory, newOptions)
    .then(html => callback(null, html));
});

app.set('views', 'src');
app.set('view engine', 'html');

app.get('*.*', express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}!`);
});

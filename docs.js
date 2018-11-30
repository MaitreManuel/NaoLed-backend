const Docs = require('express-api-doc');
const app = require('./index').app;
const docs = new Docs(app);

docs.generate({
  path: './public/template.html',
});

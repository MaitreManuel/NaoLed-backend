const Docs = require('express-api-doc');
const app = require('./index');
const docs = new Docs(app);

docs.generate({
  path: './public/template.html',
});

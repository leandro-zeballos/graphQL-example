const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

 app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
 }));
 
 app.listen(3005, () => {
  console.log('listening on port 3005...');
 });
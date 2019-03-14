const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');
const resolvers = require('./src/resolvers');
const cors = require('cors')

const PORT = 5000

const app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
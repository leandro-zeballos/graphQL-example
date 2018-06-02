# GraphQL-example
Express application for learning how to write a GraphQL Schema over a json-server database.

### Install dependencies
```
npm install
```

### Run the example
1. To run the example first you have to run the backend server providing access to the json-db.
```npm run json:server
```
2. Run the express app that serves `graphiql` which is development tool that allows us to run queries against our development server.
```npm run dev
```

3. Open the browser and navigate to `http://localhost:3005/graphql`

##### Query examples
Note: When running the queries/mutations change `[value]` for the actual value and type

##### Query:

```
programmers(id:[value]) {
   id,
   name,
   programmingLanguage {
     id,
     name,
     programmers {
       id,
       name
     }
   }
 }
```

Response:
```
{
  "data": {
    "programmers": {
      "id": "1",
      "name": "Leandro",
      "programmingLanguage": {
        "id": "1",
        "name": "Javascript",
        "programmers": [
          {
            "id": "1",
            "name": "Alex"
          },
          {
            "id": "3",
            "name": "Leandro"
          }
        ]
      }
    }
  }
}
```

##### Mutations
```
mutation {
 addPrgrammer(name: [value], age: [value], programmingLanguageId:[value]) {
 	name,
  age,
	}
}
```

```
mutation {
 deleteProgrammer(id:[value]) {
 	name,
  age,
	}
}
```

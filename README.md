# GraphQL-example
Express application for learning how to write a GraphQL Schema over a json-server database.


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

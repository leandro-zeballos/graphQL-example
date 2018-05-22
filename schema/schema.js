 const graphql = require('graphql');
 const axios = require('axios');
 const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
 } = graphql;

 const BASE_URL = 'http://localhost:3000';
 const ProgrammerType = new GraphQLObjectType({
  name: 'Programmer',
  fields: () => ({
   id: { type: GraphQLString },
   name: { type: GraphQLString },
   age: { type: GraphQLInt },
   programmingLanguage: { 
    type: ProgrammingLanguageType,
    resolve(parentValue, args) {
     return axios.get(`${BASE_URL}/programmers/${parentValue.id}/programmingLanguages`)
           .then(res => res.data)
    }
   }   
  })
 });

 const ProgrammingLanguageType = new GraphQLObjectType({
  name: 'ProgrammingLanguage',
  fields: () => ({
   id: { type: GraphQLString },
   name: { type: GraphQLString },
   programmers: { 
    type: ProgrammingLanguageType,
    resolve(parentValue, args) {
     return axios.get(`${BASE_URL}/programmers/${parentValue.id}`)
           .then(res => res.data)
    }
   }  
  })
 });

 const RootQuery = new GraphQLObjectType({ 
   name: 'RootQueryType',
   fields: () => ({
    programmingLanguage: { 
       type: ProgrammingLanguageType,
       args: { 
        id: { type: GraphQLString }
       },
       resolve(parentValue, args) {
        console.log(`${BASE_URL}/programmingLanguages/${args.id}`);
        return axios.get(`${BASE_URL}/programmingLanguages/${args.id}`)
           .then(resp => resp.data);
       }
     },
     programmers: {
      type: ProgrammerType,
      args: {
       id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
       console.log("programmers QL " + `${BASE_URL}/programmers`);
       return axios.get(`${BASE_URL}/programmers/${args.id}`)
          .then(res => {
           console.log(res);
           return res;
          })
          .then(resp => resp.data);
      }
     }
   })
 });
 
 const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
   addPrgrammer: {
    type: ProgrammerType,
    args: {
     name: { type: GraphQLString },
     age: { type: GraphQLInt },
     programmingLanguagesId: { type: GraphQLString }
    },
    resolve(parentValue, { name, age, programmingLanguagesId}) {
     return axios.post(`${BASE_URL}/programmers`, { name, age, programmingLanguagesId })
          .then(res => res.data);
    }
   },
   deleteProgrammer: {
    type: ProgrammerType,
    args: {
     id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parentValue, { id }) {
     return axios.delete(`${BASE_URL}/programmers/${id}`)
          .then(res => res.data);
    }
   }
  }
 });
 
 module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery 
 });

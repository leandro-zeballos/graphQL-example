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

 // TYPE DEFINITIONS
 const ProgrammerType = new GraphQLObjectType({
  name: 'Programmer',
  fields: () => ({
   id: { type: GraphQLInt },
   name: { type: GraphQLString },
   age: { type: GraphQLInt },
   programmingLanguage: {
    type: ProgrammingLanguageType,
    resolve(parentValue, args) {
     return axios.get(`${BASE_URL}/programmingLanguages/${parentValue.id}`)
           .then(res => res.data)
    }
   }
  })
 });

 const ProgrammingLanguageType = new GraphQLObjectType({
  name: 'ProgrammingLanguage',
  fields: () => ({
   id: { type: GraphQLInt },
   name: { type: GraphQLString },
   programmers: {
    type: new GraphQLList(ProgrammerType),
    resolve(parentValue, args) {
     return axios.get(`${BASE_URL}/programmingLanguages/${parentValue.id}/programmers`)
           .then(res => res.data)
    }
   }
  })
 });


 // GRAPHQL ROOT QUERY
 const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: () => ({
    programmingLanguage: {
       type: ProgrammingLanguageType,
       args: {
        id: { type: GraphQLInt }
       },
       resolve(parentValue, args) {
        return axios.get(`${BASE_URL}/programmingLanguages/${args.id}`)
           .then(resp => resp.data);
       }
     },
     programmers: {
      type: ProgrammerType,
      args: {
       id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
       return axios.get(`${BASE_URL}/programmers/${args.id}`)
          .then(res => {
           return res;
          })
          .then(resp => resp.data);
      }
     }
   })
 });

// GRAPHQL PROGRAMMERS MUTATIONS
 const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
   addPrgrammer: {
    type: ProgrammerType,
    args: {
     name: { type: GraphQLString },
     age: { type: GraphQLInt },
     programmingLanguageId: { type: GraphQLInt }
    },
    resolve(parentValue, { name, age, programmingLanguageId}) {
     return axios.post(`${BASE_URL}/programmers`, { name, age, programmingLanguageId })
          .then(res => res.data);
    }
   },
   deleteProgrammer: {
    type: ProgrammerType,
    args: {
     id: { type: new GraphQLNonNull(GraphQLInt) }
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

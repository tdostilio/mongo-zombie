const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const ZombieType = new GraphQLObjectType({
  name: "Zombie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    gender: { type: GraphQLString }
  })
});

module.exports = ZombieType;

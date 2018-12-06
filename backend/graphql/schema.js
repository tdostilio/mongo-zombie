const graphql = require("graphql");
const ZombieType = require("./ZombieType.js");
const Zombie = require("./../models/Zombie");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    zombie: {
      type: ZombieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Zombie.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

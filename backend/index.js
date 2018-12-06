require("dotenv").config();

const hapi = require("hapi");
const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");
const schema = require("./graphql/schema");
const mongoose = require("mongoose");
const Zombie = require("./models/Zombie");

const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("../package");

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}${
    process.env.DB_HOST
  }/zombie-manager`
);
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

const server = hapi.server({
  port: 4000,
  host: "localhost"
});

const init = async () => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "Zombies API Documentation",
          version: Pack.version
        }
      }
    }
  ]);

  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: "/graphiql",
      graphiqlOptions: {
        endpointURL: "/graphql"
      },
      route: {
        cors: true
      }
    }
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: "/graphql",
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });

  server.route([
    {
      method: "GET",
      path: "/zombies",
      config: {
        description: "Get all the zombies",
        tags: ["api", "zombie"]
      },
      handler: (req, reply) => {
        return Zombie.find();
      }
    },
    {
      method: "POST",
      path: "/zombies",
      config: {
        description: "Create a new zombie.",
        tags: ["api", "zombie"],
        validate: {
          payload: {
            name: "string",
            location: "string",
            gender: "string"
          }
        }
      },
      handler: (req, reply) => {
        const { name, location, gender } = req.payload;
        const zombie = new Zombie({
          name,
          location,
          gender
        });

        return zombie.save();
      }
    }
  ]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unHandledRejection", err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

init();

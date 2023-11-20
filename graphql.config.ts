import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "https://api.jsconf.dev/graphql", // TODO: Usar dotenv para que esta variable dependa de las variables de entorno.
  documents: ["src/**/*.gql", "!src/api/**/*.gql"],
};

export default config;

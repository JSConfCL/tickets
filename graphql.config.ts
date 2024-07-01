import dotenv from "dotenv";
dotenv.config();
import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: import.meta.env.VITE_JSCL_API_URL ?? "https://api.jsconf.dev/graphql", // TODO: Usar dotenv para que esta variable dependa de las variables de entorno.
  documents: ["src/**/*.gql", "app/**/*.gql", "!src/api/**/*.gql"],
};

export default config;

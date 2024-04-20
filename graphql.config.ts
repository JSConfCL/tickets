import dotenv from "dotenv";
import type { IGraphQLConfig } from "graphql-config";

dotenv.config({
  path: ".env.local",
});

const config: IGraphQLConfig = {
  schema:
    process.env.NEXT_PUBLIC_JSCL_API_URL ?? "https://api.jsconf.dev/graphql", // TODO: Usar dotenv para que esta variable dependa de las variables de entorno.
  documents: ["src/**/*.gql", "app/**/*.gql", "!src/api/**/*.gql"],
};

export default config;

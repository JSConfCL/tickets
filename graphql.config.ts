import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "https://api.jsconf.dev/graphql",
  documents: ["src/**/*.gql"],
};

export default config;

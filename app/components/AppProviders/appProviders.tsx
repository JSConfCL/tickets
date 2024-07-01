import { ApolloWrapper } from "~/api/ApolloWrapper";
import { AuthProvider } from "~/utils/supabase/AuthProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </AuthProvider>
  );
};

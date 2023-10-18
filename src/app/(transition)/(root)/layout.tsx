import PageTransition from "@/components/PageTransition";
import { currentUser } from "@clerk/nextjs";
import { Nav } from "@/components/nav";
export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <>
      <Nav isLogged={user !== null} />
      <PageTransition>{children}</PageTransition>
    </>
  );
}

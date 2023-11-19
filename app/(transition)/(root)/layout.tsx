import PageTransition from "@/components/PageTransition";
import { Nav } from "@/components/nav";
export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <PageTransition>{children}</PageTransition>
    </>
  );
}

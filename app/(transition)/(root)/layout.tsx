import { Nav } from "@/components/nav";
import PageTransition from "@/components/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <PageTransition>{children}</PageTransition>
    </>
  );
}

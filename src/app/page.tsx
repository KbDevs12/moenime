import CLientHome from "@/components/layout/ClientHome";

export async function generateMetadata() {
  return {
    title: "Home | Moenime",
    description: "homepage of moenime",
  };
}

export default function Home() {
  return <CLientHome />;
}

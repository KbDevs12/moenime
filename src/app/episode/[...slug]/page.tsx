import Episode from "@/components/layout/Episode";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <Episode slug={`${slug}`} />;
}

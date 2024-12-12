import AnimeDetailPage from "@/components/layout/AnimeDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <AnimeDetailPage slug={`${slug}`} />;
}

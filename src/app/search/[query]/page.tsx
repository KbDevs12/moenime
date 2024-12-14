import Search from "@/components/layout/Search";

export default async function Page({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const searchParams = (await params).query;
  return (
    <>
      <Search query={searchParams} />
    </>
  );
}

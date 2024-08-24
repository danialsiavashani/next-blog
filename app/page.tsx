import PostContainer from '@/components/PostContainer';

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  return (
    <>
      <div>
        <PostContainer search={searchParams.search} />
      </div>
    </>
  );
}

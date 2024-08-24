import { fetchPostDetails } from '@/app/actions/postActions';
import { redirect } from 'next/navigation';

export default async function PostDetails({
  params,
}: {
  params: { id: string };
}) {
  const post = await fetchPostDetails(params.id);
  console.log('Post ID:', params.id);
  if (!post) redirect('/');

  return (
    <div className="max-w-4xl mx-auto p-0">
      <article className="bg-white shadow-lg rounded-lg p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Post metadata */}
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <p>
            <span className="font-medium text-gray-700">Written by:</span>{' '}
            {post.user.name}
          </p>
          <span className="mx-2">•</span>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Post content */}
      </article>
      <article className="bg-white mt-4 shadow-lg rounded-lg p-8">
        <div className="prose prose-lg text-gray-800">{post.post}...</div>
      </article>
    </div>
  );
}

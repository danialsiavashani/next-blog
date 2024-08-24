import Link from 'next/link';
import { deletePostAction, fetchUsersPosts } from '../actions/postActions';
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  return `${truncated}...`; // Add ellipsis to indicate truncation
}
async function PostPage() {
  const posts = await fetchUsersPosts();
  return (
    <>
      <div className="p-6 md:p-10">
        <div className="mb-4">
          <Link href="/posts/create">
            <Button>Compose a post</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Position the buttons */}
              <div className="absolute  bottom-4 right-4 flex space-x-2">
                <DeletePost postId={post.id} />

                <Link
                  href={`/post/edit/${post.id}`}
                  className="p-2  rounded-full hover:bg-gray-300 transition-colors duration-300"
                >
                  <CiEdit className="text-blue-600" />
                </Link>
              </div>
              <Link href={`post/${post.id}`}>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-primary mb-2">
                    {post.user.name}
                  </h2>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Title: {post.title}
                  </h1>
                  <p className="text-gray-700">
                    {truncateText(post.post, 200)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DeletePost({ postId }: { postId: string }) {
  const deletePost = deletePostAction.bind(null, { postId });

  return (
    <FormContainer action={deletePost}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default PostPage;

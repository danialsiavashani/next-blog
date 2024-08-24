import { fetchAllPosts } from '@/app/actions/postActions';
import Image from 'next/image';
import Link from 'next/link';
import HomeImage from '@/assets/home.svg';

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  return `${truncated}...`; // Add ellipsis to indicate truncation
}

async function PostContainer({ search }: { search?: string }) {
  const posts = await fetchAllPosts({ search });
  return (
    <>
      <div className=" p-6 md:p-10  ">
        {/* Posts List Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-[800px] ">
          {posts.map((p) => {
            const { title, post } = p;
            return (
              <div
                key={p.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`post/${p.id}`}>
                  <div className="p-4">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                      {title}
                    </h1>
                    <h2 className="text-m mb-2">Written by: {p.user.name}</h2>
                    <p className="text-gray-700">{truncateText(post, 200)}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="relative flex ">
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-1/3 flex items-center justify-center hidden lg:flex mt-20 ">
            <Image
              src={HomeImage}
              alt="landing"
              width={400} // Set your desired width
              height={400} // Set your desired height
            />
          </div>

          <div className="fixed right-0 top-1/4 transform -translate-y-1/2 w-1/3 flex flex-col items-center justify-center hidden lg:flex mt-20  ">
            <h1 className="capitalize text-3xl md:text-4xl font-extrabold mb-3 text-center">
              next <span className="text-primary">-blog</span> app
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-4 text-center">
              Discover a world of insightful articles and engaging content on
              our blog page...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostContainer;

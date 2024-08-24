import Link from 'next/link';
import { deletePostAction, fetchUsersPosts } from '../actions/postActions';
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import FormContainer from '@/components/form/FormContainer';
import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableRow,
} from '@/components/ui/table';
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
<div className="mt16">
<h4 className="mb-4 capitalize">
{posts.length} {posts.length > 1 && 'posts'}{' '}
{posts.length === 1 && 'category'}
</h4>
<Table>
<TableCaption>A list of your recent categories</TableCaption>
<TableHeader>
<TableRow>
<TableHead>Title</TableHead>
<TableHead>Post</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{posts.map((post) => {
return (
<TableRow key={post.id}>
<TableCell>{post.title}</TableCell>
<TableCell>{post.post}</TableCell>
<TableCell>
<DeletePost postId={post.id} />
</TableCell>
</TableRow>
);
})}
</TableBody>
</Table>
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

<!--  -->

import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () =>
createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

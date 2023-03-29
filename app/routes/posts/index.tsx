import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostListings } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

export const loader = async () => {
  return json({
    posts: await getPostListings(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  const adminUser = useOptionalAdminUser();

  const isAdmin = adminUser?.email === ENV.ADMIN_EMAIL;

  return (
    <main>
      <h1>Posts</h1>
      {isAdmin && (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

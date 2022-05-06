import { getHeadings } from "@utils/mdx";
import { getPost } from "@utils/allPosts";
import Blog from "@components/Blog";
import ContentTable from "@components/Blog/ContentTable";
import { allArticles, Articles } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "@components/MDXComponents";

export async function getStaticPaths() {
  return {
    paths: allArticles.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const post = allArticles.find((post) => post.slug === params.slug);
  const headings = await getHeadings(post!.body.raw);
  const relatedPosts = post!.relatedPosts.map((slug: string) => getPost(slug));
  console.log(post);
  return { props: { post, headings, relatedPosts } };
}

const PostLayout = ({
  post,
  headings,
  relatedPosts,
}: {
  post: Articles;
  headings: any;
  relatedPosts: any;
}) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Blog meta={post} posts={relatedPosts}>
        <ContentTable contentTable={headings} />
        <MDXContent components={MDXComponents} />
      </Blog>
    </>
  );
};

export default PostLayout;

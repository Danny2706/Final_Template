import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlogsQuery } from "../Services/API";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const BlogDetail = () => {
  const { id } = useParams();
  const { data: blogs = [], isLoading, error } = useGetBlogsQuery();
  const blog = blogs.find((b) => String(b.id) === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#01252a] text-[#f3e1c1]">
        <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-red-500">Blog not found.</div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Blog</title>
        <meta name="description" content={stripHtml(blog.body).slice(0, 150)} />
      </Helmet>

      <section className="min-h-screen bg-[#01252a] dark:bg-[#0f1c1f] text-[#f3e1c1] px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-10">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[#f3e1c1] hover:text-yellow-300 transition mb-4 text-sm"
          >
            ← Back to Blogs
          </Link>

          {/* IMAGE + CONTENT SIDE BY SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start gap-10"
          >
            {/* IMAGE */}
            {blog.featured_image && (
              <div className="w-full md:w-1/2">
                <img
                  src={`https://carerpro.com/storage/${blog.featured_image}`}
                  alt={blog.title}
                  className="w-full rounded-xl shadow-xl object-cover"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
              <div
                className="prose dark:prose-invert max-w-none text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.body }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;

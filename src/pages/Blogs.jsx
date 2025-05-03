import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../Services/API";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Footer from "./Footer";

const Blogs = () => {
  const { data: blogs = [], isLoading, error } = useGetBlogsQuery();

  const stripHtml = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const metaTitle = blogs?.[0]?.title
    ? `Blogs | ${blogs[0].title}`
    : "Latest Blogs | Insights & Stories";
  const metaDescription = blogs?.[0]?.body
    ? stripHtml(blogs[0].body).slice(0, 150)
    : "Explore our latest blogs featuring news, tutorials, and personal insights.";

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <section className="min-h-screen py-16 bg-[#01252a] dark:bg-[#0f1c1f] text-[#f3e1c1] px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Latest Blogs</h2>

        {isLoading && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-yellow-500 border-dashed rounded-full animate-spin"></div>
            <p className="ml-4 text-lg font-medium">Loading blogs...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">
            Failed to load blogs.
          </div>
        )}

        {!isLoading && !error && blogs.length > 0 && (
          <div className="flex flex-col gap-28 max-w-6xl mx-auto">
            {blogs.map((blog, i) => {
              const isReversed = i % 2 !== 0;
              const preview = stripHtml(blog.body).slice(0, 200);

              return (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-10 ${
                    isReversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <img
                      src={`https://carerpro.com/storage/${blog.featured_image}`}
                      alt={blog.title}
                      className=" shadow-xl object-cover"
                    />
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <p className="text-xs uppercase text-[#f3e1c1] mb-1">
                      Blog Post
                    </p>
                    <h3 className="text-3xl font-bold mb-4">{blog.title}</h3>
                    <p className="text-sm leading-relaxed text-[#ddd]">
                      {preview}...
                    </p>
                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-block mt-4 text-sm text-[#f3e1c1] underline hover:text-yellow-300 transition"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
          </section>
          <Footer/>
    </>
  );
};

export default Blogs;

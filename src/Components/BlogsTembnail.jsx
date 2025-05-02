import React from "react";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../Services/api";

const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

const BlogsTembnail = () => {
  const { data: blogs = [], isLoading, error } = useGetBlogsQuery();

  if (isLoading) {
    return (
      <div className="text-center py-6 text-sm text-gray-300">
        Loading Blogs...
      </div>
    );
  }

  if (error || blogs.length === 0) {
    return <div className="text-center py-6 text-red-400">No blogs found.</div>;
  }

  return (
    <section className="w-full mx-auto bg-[#01252a] dark:bg-[#0f1c1f] px-4 py-6 text-[#f3e1c1]">
      <h3 className="text-lg font-bold mb-6">Latest Blogs</h3>

      <div className="flex flex-col gap-16">
        {blogs.slice(0, 2).map((blog, i) => (
          <div
            key={blog.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="w-full md:w-1/2">
              <img
                src={`https://carerpro.com/storage/${blog.featured_image}`}
                alt={blog.title}
                className="w-full h-56 object-cover rounded"
              />
            </div>

            {/* TEXT */}
            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase text-[#f3e1c1] mb-1">Blog Post</p>
              <h4 className="text-2xl font-bold mb-2">{blog.title}</h4>
              <p className="text-sm text-[#ccc] leading-relaxed">
                {stripHtml(blog.body).slice(0, 200)}...
              </p>
              <Link
                to={`/blog/${blog.id}`}
                className="inline-block mt-3 text-sm text-[#f3e1c1] underline hover:text-yellow-300 transition"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* All Blogs Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/blogs"
          className="text-sm text-[#f3e1c1] hover:underline font-semibold"
        >
          All Blogs →
        </Link>
      </div>
    </section>
  );
};

export default BlogsTembnail;

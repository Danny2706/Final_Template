import React from "react";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../Services/api";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Footer from "./Footer";

const Portfolio = () => {
  const { data: projects = [], isLoading, error } = useGetProjectsQuery();

  const metaTitle =
    projects?.length > 0
      ? `Projects | ${projects[0].project_name}`
      : "Projects | My Portfolio";
  const metaDescription =
    projects?.length > 0
      ? projects[0].project_description.slice(0, 150)
      : "Explore a collection of recent design and development projects.";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#01252a] text-[#f3e1c1]">
        <div className="w-16 h-16 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-medium">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load projects.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <section className="min-h-screen py-16 bg-[#01252a] dark:bg-[#0f1c1f] text-[#f3e1c1] px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>

        <div className="flex flex-col gap-36 max-w-6xl mx-auto">
          {projects.map((project, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-10 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* IMAGE */}
                <div className="w-full md:w-1/2">
                  <img
                    src={`https://carerpro.com/storage/${project.featured_image}`}
                    alt={project.project_name}
                    className="w-full shadow-xl"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p className="text-xs uppercase text-[#f3e1c1] mb-1">
                    Worked Project
                  </p>
                  <h3 className="text-3xl font-bold mb-4">
                    {project.project_name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#ddd]">
                    {project.project_description.slice(0, 300)}...
                  </p>
                  <Link
                    to={`/project/${project.id}`}
                    className="inline-block mt-4 text-sm text-[#f3e1c1] underline hover:text-yellow-300 transition"
                  >
                    View Project →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Portfolio;

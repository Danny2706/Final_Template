import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProjectsQuery } from "../Services/API";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const getYoutubeEmbedUrl = (url) => {
  try {
    if (url.includes("youtu.be"))
      return `https://www.youtube.com/embed/${
        url.split("youtu.be/")[1].split("?")[0]
      }`;
    if (url.includes("youtube.com/watch"))
      return `https://www.youtube.com/embed/${new URL(url).searchParams.get(
        "v"
      )}`;
    return null;
  } catch {
    return null;
  }
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const project = projects.find((p) => p.id === parseInt(id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#01252a] dark:bg-[#0f1c1f] text-[#f3e1c1]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-opacity-50"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20 text-red-500">Project not found.</div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.project_name} | Portfolio</title>
        <meta
          name="description"
          content={project.project_description.slice(0, 150)}
        />
        <meta property="og:title" content={project.project_name} />
        <meta
          property="og:description"
          content={project.project_description.slice(0, 150)}
        />
        <meta
          property="og:image"
          content={`https://carerpro.com/storage/${project.featured_image}`}
        />
      </Helmet>

      <section className="min-h-screen py-20 px-4 bg-[#01252a] text-[#f3e1c1]">
        <div className="max-w-6xl mx-auto space-y-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-[#f3e1c1] hover:text-yellow-300 transition mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </Link>

          {/* IMAGE + DESCRIPTION SIDE BY SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-10 items-start"
          >
            {/* IMAGE */}
            <div className="w-full md:w-1/2">
              <img
                src={`https://carerpro.com/storage/${project.featured_image}`}
                alt={project.project_name}
                className="w-full rounded-xl shadow-xl"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">
                {project.project_name}
              </h1>
              <p className="text-sm leading-relaxed text-[#ddd]">
                {project.project_description}
              </p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-md transition"
                >
                  Visit Live Site
                </a>
              )}
            </div>
          </motion.div>

          {/* VIDEO SECTION */}
          {project.video_link && (
            <div className="mt-12 aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={getYoutubeEmbedUrl(project.video_link)}
                title="Project Video"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          )}

          {/* GALLERY SECTION */}
          {project.project_galleries?.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4">Screenshots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.project_galleries.map((g, i) => (
                  <img
                    key={i}
                    src={`https://carerpro.com/storage/${g.gallery_image}`}
                    alt={`Project Screenshot ${i + 1}`}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PortfolioDetail;

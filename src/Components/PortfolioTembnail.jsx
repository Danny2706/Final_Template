import React from "react";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../Services/API";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PortfolioTembnail = () => {
  const { data: projects = [], isLoading, error } = useGetProjectsQuery();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-sm text-gray-300">
        Loading Projects...
      </div>
    );
  }

  if (error || projects.length === 0) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load projects.
      </div>
    );
  }

  return (
    <section className="w-full mx-auto bg-[#01252a] dark:bg-[#0f1c1f] px-2 py-6 text-[#f3e1c1]">
      <h3 className="text-lg font-bold mb-6 px-4">Featured Projects</h3>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        slidesPerView={1}
        spaceBetween={20}
      >
        {projects.slice(0, 4).map((project) => (
          <SwiperSlide key={project.id}>
            <div className="flex flex-col md:flex-row items-center gap-8 px-4">           
              <div className="w-full md:w-1/2">
                <img
                  src={`https://carerpro.com/storage/${project.featured_image}`}
                  alt={project.project_name}
                  className="w-full h-56 object-cover rounded"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-xs uppercase mb-1">Worked Project</p>
                <h4 className="text-2xl font-bold mb-2">
                  {project.project_name}
                </h4>
                <p className="text-sm text-[#ddd] leading-relaxed">
                  {project.project_description.slice(0, 200)}...
                </p>
                <Link
                  to={`/project/${project.id}`}
                  className="inline-block mt-3 text-sm text-[#f3e1c1] underline hover:text-yellow-300 transition"
                >
                  View Project →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-8">
        <Link
          to="/portfolio"
          className="text-sm text-[#f3e1c1] hover:underline font-semibold"
        >
          View All →
        </Link>
      </div>
    </section>
  );
};

export default PortfolioTembnail;

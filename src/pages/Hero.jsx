import React from "react";
import { useGetProfileQuery } from "../Services/API";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import About from "../Components/AboutTembnail";
import SkillsTembnail from "../Components/SkillsTembnail";
import PortfolioTembnail from "../Components/PortfolioTembnail";
import BlogsTembnail from "../Components/BlogsTembnail";
import Footer from "./Footer";

const Hero = () => {
  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;

  if (isLoading || !profile) return (
    <div className="flex items-center justify-center min-h-screen bg-white/80 dark:bg-black">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const profession = profile.profile_tags?.[0]?.profession || "Professional Graphic Designer";

  return (
    <>
      <Helmet>
        <title>{profile.full_name} | Portfolio</title>
        <meta name="description" content={profile.bio} />
      </Helmet>

      <section className="relative flex flex-col lg:flex-row h-auto lg:h-screen w-full overflow-hidden">
        <div className="flex-1 bg-[#01252a] dark:bg-[#0f1c1f] flex flex-col justify-center px-6 md:px-16 py-10 space-y-5 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#f3e1c1]">
            Hello<span className="text-yellow-300">.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-[#f3e1c1]">
            — I am {profile.bio}
          </p>
          <a
            href={profile.resume || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-[#f3e1c1] text-black rounded shadow-md hover:scale-105 transition-transform mx-auto lg:mx-0"
          >
            <FaDownload className="mr-2" />
            Download CV
          </a>
        </div>

        <div className=" bg-[#f3e1c1] flex flex-col items-center justify-center text-black py-8">
          <div className=" text-center mb-4">
            <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-[#01252a]">
              Bereket Mesefen
            </h1>
          </div>

          <img
            src={`https://carerpro.com/storage/${profile.profile_image}`}
            alt={profile.full_name}
            className="w-[260px] md:w-[520px] h-auto md:h-[600px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1 bg-[#01252a] dark:bg-[#0f1c1f] flex flex-col justify-center items-center lg:items-start px-6 md:px-16 py-10 space-y-6 text-center lg:text-left">
          <p className="text-md text-[#f3e1c1] max-w-md">
            I am a {profession}. My specialty lies in the pre-production design
            process. That’s creativity in determining the design that fits the
            company’s goals.
          </p>
          <button className="inline-flex items-center gap-2 text-lg text-[#f3e1c1] font-semibold border-b border-[#f3e1c1] hover:translate-x-1 transition-transform">
            Lets Talk <FaArrowRight />
          </button>
        </div>
      </section>
      <About />
      <SkillsTembnail /> 
      <PortfolioTembnail />
      <BlogsTembnail />
      <Footer/>
    </>
  );
};

export default Hero;

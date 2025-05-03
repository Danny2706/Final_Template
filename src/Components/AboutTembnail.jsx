import React from "react";
import { useGetProfileQuery } from "../Services/API";
import { Helmet } from "react-helmet-async";
import { FaDownload } from "react-icons/fa";

const About = () => {
  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;

  if (isLoading || !profile)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{profile.full_name} | About</title>
        <meta name="description" content={profile.bio} />
      </Helmet>

      <section className="min-h-screen px-6 sm:px-12 md:px-20 py-16 bg-[#01252a] dark:bg-[#0f1c1f] text-white flex flex-col md:flex-row items-center gap-12">

        <div className="relative shadow-lg">
          <img
            src={`https://carerpro.com/storage/${profile.profile_image}`}
            alt={profile.full_name}
            className="w-[350px] h-[550px] object-cover rounded-md border-[6px] border-[#0e2a40]"
          />
          <div className="absolute top-0 left-0 w-full h-full border-2 border-dotted border-[#5fc9f3] rounded-md opacity-20"></div>
        </div>
        <div className="flex-1 text-start space-y-6">
          <h4 className="text-sm text-gray-300 tracking-wide uppercase">
            Biography
          </h4>
          <h2 className="text-4xl font-bold">Who am I?</h2>

          <div className="flex items-center gap-2">
            <div className="w-1 h-10 bg-[#f3e1c1]"></div>
          </div>
          <h3 className="text-xl font-semibold text-[#f3e1c1]">About Me</h3>

          <h4 className="text-white text-lg font-bold">
            {profile.full_name}’s Details
          </h4>
          <p className="text-gray-300 leading-relaxed">
            {profile.about_me ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Name</span>
              <p className="text-white">{profile.full_name}</p>
            </div>

            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Email</span>
              <p className="text-white">
                {profile.email || "bereketmesefen@gmail.comom"}
              </p>
            </div>

            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Address</span>
              <p className="text-white">
                {profile.address || "Addis Ababa, ET"}
              </p>
            </div>

            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Phone</span>
              <p className="text-white">{profile.phone || "+251925318605"}</p>
            </div>
          </div>

          <a
            href={profile.resume || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f3e1c1] hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded shadow mt-6 transition duration-300"
          >
            <FaDownload />
            Download CV
          </a>
        </div>
      </section>
    </>
  );
};

export default About;

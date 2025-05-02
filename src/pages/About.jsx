import React from "react";
import { useGetProfileQuery, useGetAboutQuery } from "../Services/API";
import { Helmet } from "react-helmet-async";
import { FaDownload } from "react-icons/fa";
import Footer from "./Footer";

const About = () => {
  const { data: profileData, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: aboutData, isLoading: loadingAbout } = useGetAboutQuery();

  const profile = profileData?.data;
  const about = aboutData?.data;

  if (loadingProfile || loadingAbout || !profile || !about) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{profile.full_name} | About</title>
        <meta name="description" content={profile.bio} />
      </Helmet>

      {/* Top Section */}
      <section className="min-h-screen px-6 sm:px-12 md:px-20 py-16 bg-[#01252a] dark:bg-[#0f1c1f] text-white flex flex-col md:flex-row items-center gap-12">
        {/* Left - Image */}
        <div className="relative shadow-lg">
          <img
            src={`https://carerpro.com/storage/${profile.profile_image}`}
            alt={profile.full_name}
            className="w-[350px] h-[550px] object-cover rounded-md border-[6px] border-[#0e2a40]"
          />
          <div className="absolute top-0 left-0 w-full h-full border-2 border-dotted border-[#5fc9f3] rounded-md opacity-20"></div>
        </div>

        {/* Right - Content */}
        <div className="flex-1 text-start space-y-6">
          <h4 className="text-sm text-gray-300 tracking-wide uppercase">
            Biography
          </h4>
          <h2 className="text-4xl font-bold">Who am I?</h2>
          <div className="w-1 h-10 bg-[#f3e1c1]"></div>
          <h3 className="text-xl font-semibold text-[#f3e1c1]">About Me</h3>
          <h4 className="text-white text-lg font-bold">
            {profile.full_name}’s Details
          </h4>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {profile.about_me}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Name</span>
              <p className="text-white">{profile.full_name}</p>
            </div>

            {/* Email */}
            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Email</span>
              <p className="text-white">
                {profile.email || "bereketmesefen@gmail.comom"}
              </p>
            </div>

            {/* Address */}
            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Address</span>
              <p className="text-white">
                {profile.address || "Addis Ababa, ET"}
              </p>
            </div>

            {/* Phone */}
            <div className="relative bg-[#2e2e2e] rounded-md px-4 py-3 pl-6 border-l-24 border-[#f3e1c1]">
              <span className="text-sm text-gray-400">Phone</span>
              <p className="text-white">{profile.phone || "+251925318605"}</p>
            </div>
          </div>

          {/* Download CV */}
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

      {/* Experience Section */}
      {about?.experiance?.length > 0 && (
        <section className="bg-[#01252a] dark:bg-[#0f1c1f] text-white px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-8">Experience</h3>
            <div className="space-y-6">
              {about.experiance.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0f1c1f] border border-[#f3e1c1]/20 rounded-lg p-4 space-y-2 shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold">{item.designation}</h4>
                    <span className="text-sm text-yellow-300">
                      {item.date_from} – {item.date_to || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{item.company_name}</p>
                  <p className="text-base whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients Section */}
      {about?.clients?.length > 0 && (
        <section className="bg-[#01252a] dark:bg-[#0f1c1f] text-white px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-8">My Clients</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {about.clients.map((client, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={`https://carerpro.com/storage/${client.client_logo}`}
                    alt={client.client_name}
                    className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer/>
    </>
  );
};

export default About;

import React from "react";
import { useGetProfileQuery } from "../Services/API";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;

  if (isLoading || !profile)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#01252a] text-[#f3e1c1]">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Contact | {profile.full_name}</title>
        <meta name="description" content={`Contact ${profile.full_name}`} />
      </Helmet>

      <section className="min-h-screen px-6 sm:px-12 md:px-20 py-16 bg-[#01252a] dark:bg-[#0f1c1f] text-white flex flex-col md:flex-row gap-12 items-center">
        <div className="relative shadow-lg">
          <img
            src={`https://carerpro.com/storage/${profile.profile_image}`}
            alt={profile.full_name}
            className="w-[350px] h-[550px] object-cover rounded-md border-[6px] border-[#0e2a40]"
          />
          <div className="absolute top-0 left-0 w-full h-full border-2 border-dotted border-[#5fc9f3] rounded-md opacity-20"></div>
        </div>

        <div className="flex-1 space-y-6">
          <h4 className="text-sm text-gray-300 uppercase tracking-wide">
            Contact Info
          </h4>
          <h2 className="text-4xl font-bold">Get in Touch</h2>

          <div className="flex items-center gap-2">
            <div className="w-0.5 h-12 bg-[#f3e1c1]"></div>
          </div>
          <h2 className="text-1xl font-semibold text-[#f3e1c1]">Message</h2>
          <h2 className="text-2xl font-bold text-white">Write Me Something</h2>
          <div>
            <p className="text-[#f3e1c1]">
              Call me:
              <span className="text-[#f3e1c1] font-bold font-Montserrat text-1xl">
                {" "}
                +251925318605
              </span>
            </p>{" "}
            <br />
            <p className="text-[#f3e1c1]">
              Email:
              <span className="text-[#f3e1c1] font-bold text-1xl">
                {" "}
                bereketmesefen@gmail.com
              </span>
            </p>
          </div>
          <form className="space-y-4 mt-6">
    
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 px-4 py-3 rounded bg-[#324548] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f3e1c1]"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 rounded bg-[#324548] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f3e1c1]"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded bg-[#324548] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f3e1c1]"
            />

            <textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-3 rounded bg-[#324548] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f3e1c1]"
            ></textarea>

            <button
              type="submit"
              className="bg-[#f3e1c1] hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded shadow transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;

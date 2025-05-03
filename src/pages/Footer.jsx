import React from "react";
import { useGetContactQuery } from "../Services/API";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaMedium,
  FaPinterest,
  FaDribbble,
} from "react-icons/fa";

const iconMap = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  youtube: FaYoutube,
  medium: FaMedium,
  pinterest: FaPinterest,
  dribble: FaDribbble,
};

const Footer = () => {
  const { data, isLoading, error } = useGetContactQuery();
  const socials = data?.data?.social_accounts || {};

  const validPlatforms = Object.entries(socials).filter(
    ([platform, url]) => platform && iconMap[platform.toLowerCase()] && url // must have iconMap key and URL
  );

  return (
    <footer className="bg-[#f3e1c1] text-black py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          to="/contact"
          className="bg-black text-[#f3e1c1] px-6 py-2 rounded-md hover:bg-gray-500 transition text-center"
        >
          Contact Me
        </Link>

        <div className="flex gap-4 flex-wrap justify-center md:justify-end">
          {isLoading && <p>Loading socials...</p>}
          {error && <p>Error loading socials</p>}
          {!isLoading &&
            !error &&
            validPlatforms.map(([platform, url]) => {
              const Icon = iconMap[platform.toLowerCase()];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-gray-700 transition"
                  title={platform}
                >
                  {Icon ? <Icon /> : <span>{platform}</span>}
                </a>
              );
            })}
        </div>
      </div>

      <p className="text-center text-sm text-gray-700 mt-4">
        &copy; {new Date().getFullYear()} Bereket Mesefen | All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

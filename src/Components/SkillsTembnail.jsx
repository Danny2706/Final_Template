import React from "react";
import { useGetServicesQuery } from "../Services/API";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  FaMobileAlt,
  FaObjectUngroup,
  FaCodeBranch,
  FaPeopleCarry,
  FaLaptopCode,
  FaInfoCircle,
} from "react-icons/fa";

import "swiper/css";

const iconMap = {
  "fas fa-mobile": <FaMobileAlt size={28} className="text-yellow-400" />,
  "far fa-object-ungroup": (
    <FaObjectUngroup size={28} className="text-yellow-400" />
  ),
  "fas fa-code-branch": <FaCodeBranch size={28} className="text-yellow-400" />,
  "fas fa-people-carry": (
    <FaPeopleCarry size={28} className="text-yellow-400" />
  ),
  "fas fa-laptop-code": <FaLaptopCode size={28} className="text-yellow-400" />,
  "fas fa-info-circle": <FaInfoCircle size={28} className="text-yellow-400" />,
};

const SkillsTembnail = () => {
  const { data, isLoading } = useGetServicesQuery();
  const services = data?.service?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <div className="text-center py-4 text-sm text-gray-300">
        Loading Services...
      </div>
    );
  }

  return (
    <div className="w-full bg-[#01252a] dark:bg-[#0f1c1f] px-4 py-6 rounded-lg shadow-md">
      {/* Title */}
      <div className="mb-4 px-2">
        <h3 className="text-lg font-bold text-[#f3e1c1]">Top Services</h3>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={20}
        loop
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {services.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-[#0f2a33] text-white rounded-lg p-5 border border-[#2d3c44] h-full shadow-md hover:scale-[1.03] transition-transform duration-300">
              <div className="mb-2">
                {iconMap[item.logo] || (
                  <FaLaptopCode size={28} className="text-[#f3e1c1]" />
                )}
              </div>
              <h4 className="text-base font-semibold mb-1">{item.name}</h4>
              <p className="text-sm text-gray-300 mb-2">
                {item.short_description.slice(0, 80)}...
              </p>
              <div className="text-xs text-gray-500">
                Provided by Bereket Mesefen
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Button bottom center */}
      <div className="flex justify-center mt-6">
        <Link
          to="/service"
          className="text-sm text-[#f3e1c1] hover:underline font-semibold"
        >
          Visit All →
        </Link>
      </div>
    </div>
  );
};

export default SkillsTembnail;

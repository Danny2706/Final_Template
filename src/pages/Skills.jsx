import React from "react";
import { useGetServicesQuery } from "../Services/API";
import { Helmet } from "react-helmet-async";
import {Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // inside JSX:
import Footer from "./Footer";

const Skills = () => {
  const { data: servicesData, isLoading } = useGetServicesQuery();
  const services = servicesData?.service || [];
  const pricing = servicesData?.pricing || [];
  const testimonials = servicesData?.testimonial || [];

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white/80 dark:bg-black">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Skills | Portfolio</title>
        <meta
          name="description"
          content="Explore what I do and my development skills."
        />
      </Helmet>

      <section className="min-h-screen bg-[#01252a] dark:bg-[#0f1c1f] text-[#f3e1c1] px-4 sm:px-10 md:px-20 py-16">
        {/* ===== WHAT I DO (Skills with Icons + Lines) ===== */}
        <div className="text-center mb-12">
          <h4 className="text-sm tracking-wider uppercase text-[#ccc]">
            Service
          </h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            What I Do ?
          </h2>
        </div>
        <div className="flex flex-col gap-16 relative z-10">
          {services
            .reduce((rows, service, idx) => {
              if (idx % 2 === 0) rows.push([service]);
              else rows[rows.length - 1].push(service);
              return rows;
            }, [])
            .map((pair, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
              >
                {pair.map((item, i) => (
                  <div
                    key={i}
                    className="relative bg-[#2d3c44] text-white p-10 rounded-lg shadow-md w-full"
                  >
                    <div className="text-3xl text-yellow-400 mb-2">
                      <i className={item.logo}></i>
                    </div>
                    <h4 className="font-bold text-lg flex justify-between items-center">
                      {item.name}
                      <span className="text-yellow-400">★★★★★ 5.0</span>
                    </h4>
                    <p className="text-sm text-gray-300 mt-2">
                      {item.short_description}
                    </p>
                    <span className="text-xs text-gray-400 block mt-2">
                      Provided by Bereket Mesefen
                    </span>
                  </div>
                ))}

                {/* Vertical lines and dots */}
                <div className="hidden md:block absolute top-0 bottom-0 left-[-40px] w-[2px] bg-[#f3e1c1]" />
                <div className="hidden md:block absolute -left-[48px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#f3e1c1] rounded-full" />

                {pair.length === 2 && (
                  <>
                    <div className="hidden md:block absolute top-0 bottom-0 right-[-40px] w-[2px] bg-[#f3e1c1]" />
                    <div className="hidden md:block absolute -right-[48px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#f3e1c1] rounded-full" />
                  </>
                )}
              </div>
            ))}
        </div>
        {/* ===== PRICING SECTION ===== */}
        <div className="text-center my-16">
          <h4 className="text-sm tracking-wider uppercase text-[#ccc]">
            Service
          </h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Pricing
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {pricing.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#0f2a33] rounded-lg p-6 border border-[#2d3c44] hover:scale-105 transition-transform h-full"
            >
              <h3 className="text-4xl font-bold mb-2">
                <span className="text-[#f3e1c1]">0{index + 1}.</span>
              </h3>
              <h4 className="text-2xl mb-4">{item.name}</h4>
              <p className="text-sm text-[#ccc] mb-3">
                ${item.price_per_hour}/hr
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                {item.pricing_details.map((detail, i) => (
                  <li key={i}>— {detail.feature}</li>
                ))}
              </ul>
              <div className="w-10 h-[2px] bg-[#f3e1c1] mt-4"></div>
            </div>
          ))}
        </div>
        <div className="text-center mb-12">
          <h4 className="text-sm tracking-wider uppercase text-[#ccc]">
            Feedback
          </h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Testimonials
          </h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-[#2d3c44] text-white p-8 rounded-lg shadow-md mb-12 flex flex-col md:flex-row items-center">
                {/* RECTANGULAR IMAGE LEFT */}
                {testimonial.client_pic && (
                  <img
                    src={`https://carerpro.com/storage/${testimonial.client_pic}`}
                    alt={testimonial.client_name}
                    className="w-46 h-58 rounded-md object-cover mb-4 md:mb-0 md:mr-6"
                  />
                )}

                {/* CONFESSION RIGHT */}
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-lg">
                    {testimonial.client_name}
                  </h4>
                  <p className="text-sm text-gray-300">
                    {testimonial.designation}
                  </p>
                  <div className="text-yellow-400 my-2">★★★★★ 5.0</div>
                  <p className="italic mb-4">{testimonial.testimony}</p>
                  <div className="w-full h-[1px] bg-[#f3e1c1] my-4 opacity-30" />
                  <div className="text-sm uppercase font-bold">
                    Verified Client
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Footer />
    </>
  );
};

export default Skills;

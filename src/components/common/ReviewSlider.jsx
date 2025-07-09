import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API,
        // console.log("Fetched Reviews:", data)
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  return (
    <div className="text-white w-full bg-[#0f0f0f] py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Reviews from other learners
      </h2>

      <div className="max-w-7xl mx-auto">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-4 rounded-xl p-5 bg-gray-900 text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-700 min-h-[200px]">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="user"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {review?.course?.courseName}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-sm">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : review?.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="font-bold text-yellow-400">
                    {review.rating.toFixed(1)}
                  </span>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#facc15"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;

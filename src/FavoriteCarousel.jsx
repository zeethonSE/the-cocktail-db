import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const FavoriteCarousel = ({ favorites, onSelect }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },  // Mobile (1 slide)
        480: { slidesPerView: 2 },  // Small tablets (2 slides)
        768: { slidesPerView: 3 },  // Tablets (3 slides)
        1024: { slidesPerView: 4 }, // Small laptops (4 slides)
        1280: { slidesPerView: 5 }, // Large screens (5 slides)
        1536: { slidesPerView: 6 }, // Extra-large screens (6 slides)
      }}
      className="w-full"
    >
      {favorites.map((drink) => (
        <SwiperSlide key={drink.id} onClick={() => onSelect(drink)}>
          <div className="p-4 cursor-pointer">
            <img
              src={drink.image}
              alt={drink.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3><p className="text-center mt-2 eagle-lake-regular">{drink.name}</p></h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FavoriteCarousel;

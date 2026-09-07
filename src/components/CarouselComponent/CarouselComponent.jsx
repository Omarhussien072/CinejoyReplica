import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import Card from '../Card/Card';
export default function CarouselComponent({ cardsData, type, title }) {
    return (

        <div className='relative lg:block'>
            <h2 className='text-white text-xl font-semibold'>{title}</h2>
            <Swiper modules={[Navigation, FreeMode]} navigation={true} freeMode={true} spaceBetween={16} slidesPerView={'auto'} className='w-full'>
                {
                    (cardsData && type === 'movie') ? cardsData.map((movie) => (
                        <SwiperSlide key={movie.id} className="w-50! lg:w-65! select-none">
                            <Card id={movie.id} title={movie.title} img_path={movie.backdrop_path} release_date={movie.release_date} vote={movie.vote_average} type={type} />
                        </SwiperSlide>
                    )) : cardsData.map((show) => (
                        <SwiperSlide key={show.id} className="w-50! lg:w-65! select-none">
                            <Card id={show.id} title={show.name} img_path={show.backdrop_path} release_date={show.first_air_date} vote={show.vote_average} type={type} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

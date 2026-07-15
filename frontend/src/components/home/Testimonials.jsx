import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../common/SectionTitle';
import API from '../../utils/axios';

const defaultTestimonials = [
  { name: 'James Wilson', role: 'Business Client', rating: 5, content: 'Exceptional legal representation. They handled my corporate case with the utmost professionalism and secured an outcome that exceeded all expectations.' },
  { name: 'Maria Garcia', role: 'Family Law Client', rating: 5, content: 'The compassion and legal expertise shown during my family law matter was remarkable. I felt supported and well-represented throughout.' },
  { name: 'David Thompson', role: 'Criminal Defense Client', rating: 5, content: 'My lawyer was aggressive, thorough, and incredibly knowledgeable. They secured the best possible outcome for my case.' },
  { name: 'Sarah Johnson', role: 'Property Client', rating: 5, content: 'A seamless real estate transaction handled with meticulous attention to detail. Their expertise saved me from potential legal complications.' },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  useEffect(() => {
    API.get('/testimonials').then(({ data }) => {
      if (data.testimonials?.length) setTestimonials(data.testimonials);
    }).catch(() => {});
  }, []);

  return (
    <section className="section-padding py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="container-max relative z-10">
        <SectionTitle
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Hear from our clients about their experience working with our firm."
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-14"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="premium-card p-8 h-full flex flex-col">
                <FaQuoteLeft className="text-gold/15 text-5xl mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, j) => <FaStar key={j} className="text-gold" size={13} />)}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-1 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-navy font-bold text-sm">{t.name}</h4>
                    <p className="text-text-secondary text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

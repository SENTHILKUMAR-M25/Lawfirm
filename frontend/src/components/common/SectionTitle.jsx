import ScrollReveal from './ScrollReveal';

const SectionTitle = ({ subtitle, title, description, light = false, center = true }) => {
  return (
    <ScrollReveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-14 lg:mb-18`}>
      {subtitle && (
        <span className={`inline-block text-sm font-semibold tracking-[4px] uppercase mb-4 ${light ? 'text-gold' : 'text-gold'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`section-title mb-5 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {center && <div className="section-divider mx-auto mb-5" />}
      {description && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl mx-auto ${light ? 'text-white/60' : 'text-text-secondary'}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
};

export default SectionTitle;

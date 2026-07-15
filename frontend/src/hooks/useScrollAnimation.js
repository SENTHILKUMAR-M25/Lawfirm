import { useEffect, useRef } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

export const useGsapAnimation = (ref, animation) => {
  useEffect(() => {
    if (!ref.current) return;
    import('gsap').then(({ default: gsap }) => {
      gsap.fromTo(ref.current, { opacity: 0, y: 50, ...animation?.from }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', ...animation?.to });
    });
  }, [ref, animation]);
};

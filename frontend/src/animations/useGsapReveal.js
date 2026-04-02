import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(targets, options = {}) {
  const defaults = {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out",
    start: "top 85%",
  };

  let context;

  onMounted(() => {
    context = gsap.context(() => {
      gsap.from(targets, {
        ...defaults,
        ...options,
        scrollTrigger: {
          trigger: options.trigger || targets,
          start: options.start || defaults.start,
          once: true,
        },
      });
    });
  });

  onUnmounted(() => {
    if (context) context.revert();
  });
}

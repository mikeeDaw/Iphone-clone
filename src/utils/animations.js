import gsap from "gsap";

export const animateGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secTarget,
  animProps
) => {
  // Animate the rotation to reset to the base/normal/default rotation value when switching.
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });
  // Animate the first target (the one that will move away)
  timeline.to(firstTarget, { ...animProps, ease: "power2.inOut" }, "<");
  // Animate the second target (one that will move to the focus.)
  timeline.to(secTarget, { ...animProps, ease: "power2.inOut" }, "<");
};

// Just call this to avoid keep typing gsap scroll trigger.
export const gsapScrollTrigger = (target, animProps, scrollProps) => {
  gsap.to(target, {
    ...animProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

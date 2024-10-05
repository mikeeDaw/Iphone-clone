export const animateGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secTarget,
  animProps
) => {
  // Animate the rotation
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

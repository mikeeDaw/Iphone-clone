# Making Another ThreeJS Website ://

## Dependencies

1. `npm i gsap @gsap/react`
   - `gsap` - normal gsap library.
   - `@gsap/react` - gsap hooks for react.
2. `npm i three @react-three/drei @react-three/fiber`

## Topics

- Tailwind `@layer` and Classes - `index.css`
- Assets Utilities - `utils/index.js`
- Project Constants - `constants/index.js`

## Creation Process

- Navbar - `Navbar.jsx`
- Add playing video & Hero Section - `Hero.jsx`
- Video Carousel - `VideoCarousel.jsx`
  - Syncing the animation progress to the duration of a video.
  - gsap `ticker` vs `onUpdate`.
  - Progress bar of video
- Create 3JS Views - `Model.jsx`
- Custom Light - `3JS/Lights.jsx`
- Make the phone change color - `3JS/Iphone.jsx`
- Phone switching - `Model.jsx` and `utils/animations.js`

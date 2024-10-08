# Making Another ThreeJS (Iphone Clone) :/

## Dependencies

1. `npm i gsap @gsap/react`
   - `gsap` - normal gsap library.
   - `@gsap/react` - gsap hooks for react.
2. `npm i three @react-three/drei @react-three/fiber`
3. `npm install --save @sentry/react`
   - `@sentry/react` - react sentry app for web statistics

## Using Sentry

- [Sentry's Site](https://sentry.io/welcome/)
- an Application Performance Monitoring (APM) and Error Tracking services.
- helps developers monitor, track, and resolve performance issues and errors in real-time for applications, both on the client (frontend) and server (backend).

1. Click 'Start'
2. Select platform to monitor. Browser > React
3. Press 'Configure SDK' then follow the steps.
4. Copy and paste the javascript code to `main.jsx`.
5. Upload the source maps.
   - Install wizard? Yes
   - Wizard will create and update files? Yes
   - Do you have sentry account? Yes
   - Which Framwork? Vite
   - Using CI/CD tool? Yes
   - Yes, continue!
6. Modify the 'integrations' - `main.jsx`
7. Wrap the App with sentry - `App.jsx`

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
- Integrating website stats with [Sentry](https://sentry.io/welcome/).
- Features Section - `Features.jsx`

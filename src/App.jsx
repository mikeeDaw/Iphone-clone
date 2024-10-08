import Chip from "./components/Chip";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import Model from "./components/Model";
import Navbar from "./components/Navbar";

// Import All from sentry
import * as Sentry from "@sentry/react";

const App = () => {
  // Testing of Error detection and Tracking with Sentry.
  // return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlight />
      <Model />
      <Features />
      <Chip />
      <Footer />
    </main>
  );
};

// Wrap the `App` in `Sentry.withProfiler()`.
export default Sentry.withProfiler(App);

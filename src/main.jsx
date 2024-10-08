import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//...
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://1ce75a22ad679e9746e8f1b66622fe53@o4508085957820416.ingest.de.sentry.io/4508085963915344",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    // Add this..
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.u,
    }),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// Remove this from the Sentry Copy/Paste.
// const container = document.getElementById(“app”);
// const root = createRoot(container);
// root.render(<App />);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { track } from "@vercel/analytics";

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    track(eventName, properties);
  } catch (error) {
    // Fail silently in local development or if blocked by client-side adblockers
  }
};

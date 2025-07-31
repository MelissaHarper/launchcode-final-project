import axios from "axios";
import { verifyWebhook } from "@clerk/react-router/webhooks";

export const authorization = import.meta.env.VITE_AUTHORIZATION;

export const tmdbBaseUrl = import.meta.env.VITE_BASE_TMDB_API_URL;

export const tmdbApiKey = import.meta.env.TMDB_API_KEY;

export const tmdbImgBaseUrl = "https://image.tmdb.org/t/p/w45";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: authorization,
  },
};

export const api = () =>
  axios.create({
    baseURL: tmdbBaseUrl,
    headers: {
      accept: "application/json",
      authorization: authorization,
    },
  });

export const action = async ({ request }) => {
  try {
    const evt = await verifyWebhook(request);

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
};

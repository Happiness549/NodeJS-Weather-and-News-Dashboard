import * as https from "https";
import dotenv from "dotenv";
dotenv.config();


async function GetWeather(location: string): Promise<void> {
  try {
    const API_KEY = process.env.API_KEY;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=${API_KEY}&contentType=json`;

    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const weatherData = JSON.parse(data);

        console.log("Weather:", weatherData);
      });

    }).on("error", (error) => {
      console.error("Request error:", error.message);
    });

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function GetNews(): Promise<void> {
  try {
    const url = `https://dummyjson.com/posts?limit=5`;

    https.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const newsData = JSON.parse(data);

        console.log("News:", newsData);
      });

    }).on("error", (error) => {
      console.error("Request error:", error.message);
    });

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

GetWeather("Durban");
GetNews();
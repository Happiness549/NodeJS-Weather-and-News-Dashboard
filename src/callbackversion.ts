import * as https from "https";
import dotenv from "dotenv";

dotenv.config();

function GetWeather(location: string, callback: (error: Error | null, weatherData?: string) => void){
 const API_KEY = process.env.API_KEY;
 const url  = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;
 
https.get(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () =>{
    const weatherData = JSON.parse(data);
    callback(null, weatherData)
  })
})}
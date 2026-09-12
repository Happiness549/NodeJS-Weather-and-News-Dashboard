import * as https from "https";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

function GetWeather(location: string, callback: (error: Error | null, weatherData?: unknown) => void){
 const API_KEY = process.env.API_KEY;
 const url  = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=${API_KEY}&contentType=json`;
 
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


function GetNews(callback: (error: Error | null, newsData?: unknown)=> void){
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=NEWS_API_KEY`

    https.get(url, (response) =>{
        let news = ""
        response.on("news", (chunk) =>{
            news += chunk
        })

        response.on("end", () => {
            const newsData = JSON.parse(news);
            callback(null, newsData)
        })
    })

}

GetWeather("Durban",(error, weatherData) =>{
    if(error){
        console.error(`Error fetching weather..`, error.message)
        return;
    }
    console.log("Weather:", weatherData);
})

GetNews((error, newsData) => {
  if (error) {
    console.error("News error:", error.message);
    return;
  }

  console.log("News:", newsData);

});
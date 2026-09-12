import * as https from "https";
import dotenv from "dotenv";


dotenv.config();

function GetWeather(location: string):Promise<unknown> {
    const API_KEY = process.env.API_KEY;
    const url  = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=${API_KEY}&contentType=json`;

    return new Promise((resolve, reject) => {
       const request =  https.get(url, (response) => {
           let data = "";
            response.on("data", (chunk) => {
               data += chunk;
          });

     

        request.on("error", (error) => {
          reject(error);
        });

           response.on("end", () =>{
          const weatherData = JSON.parse(data);
          resolve( weatherData)
          })
        
    })

})
}

GetWeather("Durban")
  .then((weatherData) => {
    console.log("Weather:", weatherData);
  })
  .catch((error) => {
    console.error("Weather error:", error.message);
  });
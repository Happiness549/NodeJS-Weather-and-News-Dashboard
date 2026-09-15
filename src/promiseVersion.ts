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

 
async function GetNews(): Promise<unknown> {
    const url = `https://dummyjson.com/posts/2`;

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let Newsdata = "";

            response.on("data", (chunk) => {
                Newsdata += chunk;
            });

            response.on("end", () => {
                const newsData = JSON.parse(Newsdata);
                resolve(newsData);
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}

GetWeather("Durban")
  .then((weatherData) => {
    console.log("Weather:", weatherData);
  })
  .catch((error) => {
    console.error("Weather error:", error.message);
  });


GetNews()
  .then((newsData) => {
    console.log("News:", newsData);
  })
  .catch((error) => {
    console.error("News error:", error.message);
  });

  Promise.all([GetWeather("Durban"), GetNews()])
  .then(([weatherData, newsData]) => {
    console.log("Weather of promise all:", weatherData);
  
    console.log("News of promise all:", newsData);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

  Promise.race([GetWeather("Durban"), GetNews()])
  .then((result) => {
    console.log("First resolved result:", result);
    })
    .catch((error) => {
    console.error("Error:", error.message);
  });
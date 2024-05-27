
let form = document.querySelector("#weatherForm");
let userInput = document.querySelector("#userInput");
let formBtn = document.querySelector("#weatherBtn");
let openLinks = document.querySelector("#open_Links");
let links = document.querySelector(".links");

// Other Functionalites
let isLinkOpen = true;
openLinks.addEventListener("click", () => {
    if (isLinkOpen) {
        openLinks.setAttribute("class", "fa-solid fa-xmark");
        links.style.left = "0%";
        openLinks.style.color = "white";
        openLinks.style.position = "absolute";
        openLinks.style.right = "20px";
        openLinks.style.fontSize = "28px";
        isLinkOpen = false;
    } else {
        links.style.left = "-100%";
        isLinkOpen = true;
        openLinks.setAttribute("class", "fa-solid fa-bars");
        openLinks.style.animationDuration = "2s";
    }
});

// Select for showing Api Data
// Temp
let temp1 = document.querySelector(".temp_box");
let temp2 = document.querySelector(".temp1");
let minTemp = document.querySelector(".temp2");
let maxTemp = document.querySelector(".temp3");
let heading = document.querySelector("#heading");

// Humidity
let humidity = document.querySelector(".humidity_box");
let windDegree = document.querySelector(".humidity1");
let feelLike = document.querySelector(".humidity2");
let humidityInPara = document.querySelector(".humidity3");

// Wind Section
let wind = document.querySelector(".wind_box");
let windSpeed = document.querySelector(".wind1");
let sunrise = document.querySelector(".wind2");

const weather = async (event) => {
    event.preventDefault();
    heading.innerHTML = "";
    let city = userInput.value;
    let apiKey = "0949266f128cb4050101212f1defb902"; // Api key hai jo openweatherapi ki websiti se li hai
    formBtn.disabled = true;
    try {
        heading.innerText = "Searching...";
        let apiURL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`); // UR   L of API 
        let JsonData = await apiURL.json(); // Data in JSON Format
        formBtn.disabled = false;
        
        // Putting Data in Html Elements
        // Main Heading
        heading.innerText = `Weather for "${JsonData.name}"`;

        // Temperature Section
        temp1.innerHTML = `${JsonData.main.temp} °C`;
        temp2.innerHTML = `Temperature is ${JsonData.main.temp}°C`;
        minTemp.innerHTML = `Min Temperature is ${JsonData.main.temp_min}°C`;
        maxTemp.innerHTML = `Max Temperature is ${JsonData.main.temp_max}°C`;

        // Humidity Section
        humidity.innerHTML = `${JsonData.main.humidity}%`;
        windDegree.innerHTML = `Wind degree is ${JsonData.wind.deg}°`;
        feelLike.innerHTML = `Feels like ${JsonData.main.feels_like}°C`;
        humidityInPara.innerHTML = `Humidity is ${JsonData.main.humidity}%`;

        // Wind Section
        wind.innerHTML = `${JsonData.wind.speed} km/hr`;
        windSpeed.innerHTML = `Wind speed is ${JsonData.wind.speed} km/hr`;

        // Converting Unix timestamp to readable time
        let sunriseTime = new Date(JsonData.sys.sunrise * 1000);
        let hours = sunriseTime.getHours();
        let minutes = "0" + sunriseTime.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2);
        sunrise.innerHTML = `Sunrise time: ${formattedTime}`;

        // input reset
        userInput.value = "";
    } catch (error) {
        console.error;
        formBtn.disabled = false;
    }
};

form.addEventListener("submit", weather);

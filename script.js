

fetch("https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=adc711dab7ec51eca210793f032dba96")
.then((res) => res.json())
.then((data) => {
    console.log(data);
    putmaindata(data);
});

function putmaindata(data){
    document.getElementById('city-name').innerHTML = data.name;
    var imgurl = 'http://api.openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    getforecast(data);

    document.getElementById('img-at-main').src = imgurl;

    document.getElementById('temp-at-main').innerHTML = Math.floor(data.main.temp - 273) + '°C';

    document.getElementById('nature-at-main').innerHTML = data.weather[0].description;

    Rimg(data.wind.deg);
}

function getforecast(gap){
    var forecasturl = "https://api.openweathermap.org/data/2.5/forecast?q=" + gap.name + "&appid=adc711dab7ec51eca210793f032dba96"
    fetch(forecasturl).then((res) => res.json()).then((forecastdata) => {
        console.log(forecastdata);
        putforecastdata(forecastdata);
    });
}

function putforecastdata(forecastdata){
    document.querySelector('.box-holder').innerHTML = "";
    for(var i=0; i < forecastdata.list.length; i = i + 8){
        con = document.createElement('div');
        con.setAttribute('class', 'predition');

        imag = document.createElement('img');
        imag.setAttribute('class', 'prediction-images');

        tem = document.createElement('h2');
        tem.setAttribute('class', 'prediction-temp');

        imag.src = 'http://api.openweathermap.org/img/w/' + forecastdata.list[i].weather[0].icon + '.png';

        tem.innerHTML = Math.floor(forecastdata.list[i].main.temp - 273) + '°C';
        
        con.appendChild(imag);
        con.appendChild(tem);
        document.querySelector('.box-holder').appendChild(con);
    }
}

function searchByCity(){
    var name = document.getElementById('search-value').value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=adc711dab7ec51eca210793f032dba96")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        putmaindata(data);
    });
    document.getElementById('search-value').value = "";
}

function Rimg(d){
    var compass = document.getElementById('direction-needle');

    d = d - 180;

    compass.style.rotate = d + 'deg';
}

function scrollRight(){
    var s = document.querySelector('.box-holder');
    s.scrollLeft += 100;
}

function scrollLef(){
    var s = document.querySelector('.box-holder');
    s.scrollLeft -= 100;
}
import {useEffect, useState} from 'react';
import axios from 'axios';
export default function App(){
  const [city, setCity] = useState('abuja');
  const [weatherDetails, setWeatherDetails] = useState(null);
  const getWeather = async () => {
    try {
    const data = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=8ff46d8cb97640a88b7213101251602&q=${city}&aqi=no&days=14&alerts=no`);
   
    setWeatherDetails({
      icon: data.data.current.condition.icon,
      temp_c: data.data.current.temp_c,
      temp_f: data.data.current.temp_f,
      name: data.data.location.region,
      forecast: data.data.forecast.forecastday.map(value => ({
        date: value.date,
        temp_c: value.day.avgtemp_c,
        temp_f: value.day.avgtemp_f,
        icon: value.day.condition.icon
      }))
    })
   console.log(data.data)
  } catch(err){
    console.log(err)
    alert('Invalid city')
  }
  };
  useEffect(function(){
  getWeather().then(console.log)
  }, [])
  return (
    <>
      <div className='body'>
        <div className='input-wrapper'>
          <input value={city} placeholder='Enter a city' onChange={(e) => setCity(e.target.value)}/>
          <button onClick={getWeather}>Check weather</button>
        </div>
        <div className='weather-result'>
          {weatherDetails && (
            <>
             <img src={weatherDetails.icon} alt='temperature' />
             <p>{weatherDetails.name}</p>
             <p>{weatherDetails.temp_c} C {weatherDetails.temp_f} F</p>
          </>
          )
          }
          <div className='forecast' style={{display: 'flex', gap: 15}}>
            {weatherDetails && weatherDetails.forecast.map(value => (
              <div>
                <img src={value.icon}/>
                <p>{value.date}</p>
                <p>{value.temp_c} C</p>
                <p>{value.temp_f} F</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
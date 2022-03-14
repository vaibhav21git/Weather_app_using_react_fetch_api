import React , {useState} from 'react'
import './App.css'


// here you can easily use props but props is limited to parent to child only in parent u have to make a props and pass it to the child and then consume in child and it is not necessary to import the parent component in childs component 

function App() 
{

  const [weatherData ,setWeatherData] = useState('')
  const [city , setCity] = useState('')


 const getweather = (event) => 
 {
     if(event.key === "Enter")
     {
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
       .then(response => response.json())
       .then(data => {
         console.log(data);
         setWeatherData(data)
         setCity("")
        })
     } 
 }



  return (
    <div className='container'>
     <input 
     className='input form-control' 
     placeholder='Enter the name of the city...'
     onChange={e=> setCity(e.target.value)}
     value={city}
     onKeyPress={getweather}
     />

     { typeof weatherData.main === 'undefined' ? 
     (
     <div>
     <p> welcome to my weather App !!.Enter the name of the city.</p>
    </div>
      ):(
      <div className = 'weather-data'>
        <p className = 'city'>{weatherData.name}</p>
        <p className = 'temp'>TEMPERATURE IN FAHRENHEIT - {Math.round(weatherData.main.temp)}F</p>
        <p className  = 'weather'>DESCRIPTION - {weatherData.weather[0].main}</p>
        <p className  = 'weather'>PRESSURE - {weatherData.main.pressure}</p>
        <p className  = 'weather'>HUMIDITY - {weatherData.main.humidity}</p>
      </div>  
        )}

        {weatherData.cod === '404'?(<p>
          <div class="alert alert-dark" role="alert">
 City Not Found
</div>
        </p>):(<>
        </>)}

      </div>
  )
}

export default App;
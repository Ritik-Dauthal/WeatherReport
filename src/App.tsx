import React, { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  
type dataProps = {
  name : string;
  main:{
    temp : number;
    humidity:number
     pressure: number
  }
  sys : {
    sunrise:number
    sunset:number
  }
  wind:{
    speed:number;
  }
  
   
    
  
}
const [city , setCity] = useState("Delhi")
const [data, setDAta ]= useState<dataProps>()

const getWeatherDetail = (city:string)=>{
   if(!city){return}
  const Api =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c5442e3f7d4dbae25f44d68ece067573"
  axios.get(Api).then((response)=>{
  setDAta(response.data)
  }).catch((err)=>{
    console.log(err)
  })


}
 
useEffect(()=>{getWeatherDetail(city)},[data])
 
const handleChange = ( event: React.ChangeEvent<HTMLInputElement>)=>{
  setCity(event.target.value)
}
const handleSearch = () => {
 getWeatherDetail(city)
}

  return (
    <div className="flex-col justify-center items-center " >
      <div className="h-screen">
      <div className="bg-sky-300 h-1/2 flex flex-col md:flex-row justify-center items-center "> 
      <input type="search" placeholder="Enter City Here" onChange={handleChange} value={city} className="border-4 border-gray-700 rounded-md mb-2 md:mb-0 text-center"/>
      <button className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-red-800" onClick={handleSearch} >Search</button></div>
      <div className="h-1/2 bg-gray-300  flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black">{data?.name}</h1>
        <h2 className="md:text-4xl text-lg font-mono text-lime-800 mt-4">{data?.main.temp } kelvin</h2>
        <div className="flex gap-5 md:gap-10"> <h2 className="md:text-xl text-sm font-mono text-cyan-800">Sunrise - {data?.sys.sunrise}</h2>
       
          <h2 className="md:text-xl text-sm font-mono text-cyan-800">Sunset - {data?.sys.sunset}</h2>
          </div>
           <h2 className="text-xl font-mono text-green-700">Humidity - {data?.main.humidity}</h2>
               <h2 className="text-xl font-mono text-yellow-700">Pressure - {data?.main.pressure}</h2>
             <h2 className="text-xl font-mono text-teal-600">Wind Speed - {data?.wind.speed}</h2>
         </div>
      </div>
     

    </div>
  )
}

export default App

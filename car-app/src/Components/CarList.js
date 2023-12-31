import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import noImage from '../../src/Assets/noImg.png';
import edit from '../../src/Assets/edit.svg';
import add from '../../src/Assets/addNote.svg';
import deleteCar from '../../src/Assets/delete.svg';
import NoteTable from './NoteTable';

export default function Example() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded' // Use 'application/x-www-form-urlencoded' content type
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars/all',{
          headers: headers
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };
    fetchData();
    console.log(data)
  }, []);

  const handleDeleteClick = async (carId) => {
    const token = localStorage.getItem('token');
    console.log('carId: ' + carId)
    if (carId === null) {
      return; // Exit the function if carId is null
    }
    const apiUrl = 'http://localhost:8080/api/cars/delete';
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:carId}),
    };
    console.log(requestOptions)
    fetch(apiUrl, requestOptions).then(setData(data.filter(car => car.id !== carId)))
  };

  return (
    <>
      <div className="pt-24 pb-24">
        {data.map((car, index) => (
          <div key={index} className="flex flex-col items-center mt-4 px-4 sm:px-0">
            <div className="float-left w-full sm:w-11/12 md:w-9/12 h-auto rounded-lg bg-black flex flex-col sm:flex-row justify-between car-list">
              <div className="flex items-center w-full sm:w-1/4 text-white m-2.5 overflow-hidden">
                <img
                  className="w-full max-w-full h-32 sm:h-auto object-contain object-center"
                  src={noImage}
                  alt="carImage"
                />
              </div>
              <div className= "text-white w-full sm:w-6/12 m-0 py-2.5 flex flex-col justify-center items-center sm:items-start">
                <h2 className="text-2xl sm:text-3xl text-center sm:text-left">
                  {car.marka} {car.model} {car.nazwa} {car.rok}r.
                </h2>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                  {car.przebieg} km, {car.moc} KM {car.paliwo}
                </p>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                  {car.opis}
                </p>
              </div>
              <div className="text-white w-full sm:w-56 flex-col justify-center sm:justify-end sm:float-right py-2.5 ">
                <p className="flex text-2xl py-0.5 text-left sm:text-left justify-center sm:justify-end mr-2">
                  Wydałeś
                </p>
                <p className="flex text-2xl py-0.5 text-left sm:text-left justify-center sm:justify-end mr-2">
                  {car.koszt} PLN
                </p>
                <div className="flex pr-0 ml-3 mr-2 justify-center sm:justify-end">
                  <Link to={`/AddNote/${car.id}`} className="flex pr-0 ml-3" >
                    <img className="w-7 h-9" src={add} alt="addIcon" />
                  </Link>
                  <Link to={`/EditCar/${car.id}`} className="flex pr-0 ml-3" >
                    <img className="w-7 h-9" src={edit} alt="editIcon" />
                  </Link>
                  <button className="flex pr-0 ml-3" onClick={() => handleDeleteClick(car.id)}> 
                    <img className="w-7 h-9" src={deleteCar} alt="deleteIcon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="float-left w-full sm:w-11/12 md:w-9/12 bg-black rounded-lg">
              <NoteTable carId={car.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

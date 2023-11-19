import React, { useEffect, useState } from 'react';
import axios from 'axios';

import noImage from '../../src/Assets/noImg.png';
import serceW from '../../src/Assets/serceWypelnioneOgloszenie.svg';

export default function Example() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/getFavourites', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  console.log(data);

  // dane do podmiany jezeli potrzebujesz wiecej
  const data2 = [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data]
  console.log(data2);


  // wzorzec danych statycznych
  // title: 'Volvo XC 90 D5 2019',
  // description: '98 000 km, 1 969 cm3, 235 KM, Diesel',
  // price: '25000 PLN',

  return (
    <>
      <div className="flex flex-wrap justify-center pt-5 h-full">
        {data2.map((car, index) => (
          <div key={index} className="w-11/12 sm:w-1/2 md:w-1/4 h-96 rounded-lg bg-black flex flex-col justify-center items-center mx-2.5 my-2.5">
            <div className="w-11/12 md:w-full px-2 md:px-0 text-white m-1 md:m-2.5 overflow-hidden">
              <img className="w-full h-32 object-contain object-center" src={noImage} alt='carImage' />
            </div>
            <div className="text-white w-11/12 md:w-full m-0 py-1 md:py-2.5 px-2.5 flex flex-col justify-center items-center">
              <h2 className='text-2xl text-center'>{car.marka} {car.model} {car.nazwa}</h2>
              <p className='text-lg text-center'>{car.przebieg}km,  {car.pojemnosc}cm<sup>3</sup>, {car.moc}KM {car.paliwo}</p>
            </div>
            <div className="text-white w-11/12 md:w-70 flex py-1 md:py-2.5 justify-center">
              <button className='flex pr-2.5'>
                <img className='w-7 h-9' src={serceW} alt='heartIcon' />
              </button>
              <p className='text-3xl py-0.5 text-center'>{car.cena} PLN</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

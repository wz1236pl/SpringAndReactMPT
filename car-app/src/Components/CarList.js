import React, { useEffect, useState } from 'react';
import axios from 'axios';

import noImage from '../../src/Assets/noImg.png';
import serceP from '../../src/Assets/sercePusteOgloszenie.svg';
import serceW from '../../src/Assets/serceWypelnioneOgloszenie.svg';

export default function Example() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/all');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getFavourites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (token) {
      fetchFavorites();
    }
  }, []);

  console.log(data);

  // TODO: fix it still not working
  const handleFavoriteClick = async (carId) => {
    if (carId === null) {
      return; // Exit the function if carId is null
    }

    const isFavorite = favorites.includes(carId);
    const token = localStorage.getItem('token');

    try {
      if (isFavorite) {
        // Optimistic update: Remove the car from favorites immediately
        setFavorites(favorites.filter((id) => id !== carId));

        // Send request to delete favorite
        const response = await axios.delete('http://localhost:8080/deleteFavourites',
          { id: carId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        console.log(response.data);
        console.log(response.headers);

      } else {
        // Optimistic update: Add the car to favorites immediately
        setFavorites([...favorites, carId]);

        // Send request to add favorite
        const response = await axios.post(
          'http://localhost:8080/addFavourites',
          { id: carId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);
        console.log(response.data);
        console.log(response.headers);
      }

      // Refresh the component data after updating favorites
      const response = await axios.get('http://localhost:8080/all');
      setData(response.data);
    } catch (error) {
      console.error('Error updating favorites:', error);

      // Revert the optimistic update in case of an error
      if (isFavorite) {
        setFavorites([...favorites, carId]);
      } else {
        setFavorites(favorites.filter((id) => id !== carId));
      }
    }
  };

  return (
    <>
      <div className="pt-24 pb-24">
        {data.map((car, index) => (
          <div key={index} className="flex justify-center mt-4 px-4 sm:px-0">
            <div className="w-full sm:w-11/12 md:w-9/12 h-auto rounded-lg bg-black flex flex-col sm:flex-row justify-between car-list">
              <div className="flex items-center w-full sm:w-1/4 text-white m-2.5 overflow-hidden">
                <img
                  className="w-full max-w-full h-32 sm:h-auto object-contain object-center"
                  src={noImage}
                  alt="carImage"
                />
              </div>
              <div className="text-white w-full sm:w-7/12 m-0 py-2.5 flex flex-col justify-center items-center sm:items-start">
                <h2 className="text-2xl sm:text-3xl text-center sm:text-left">
                  {car.marka} {car.model} {car.nazwa} {car.rok}
                </h2>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                  {car.przebieg} km, {car.pojemnosc} cm<sup>3</sup>, {car.moc} KM {car.paliwo}
                </p>
              </div>
              <div className="text-white w-full sm:w-56 flex justify-center sm:float-right py-2.5">
                <button className="flex pr-2.5" onClick={() => handleFavoriteClick(car.id)}>
                  <img className="w-7 h-9" src={favorites.includes(car.id) ? serceW : serceP} alt="heartIcon" />
                </button>
                <p className="text-3xl py-0.5 text-center sm:text-left">
                  {car.cena} PLN
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

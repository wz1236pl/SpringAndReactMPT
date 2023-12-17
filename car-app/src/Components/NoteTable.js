import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';

import edit from '../../src/Assets/edit.svg';
import deleteCar from '../../src/Assets/delete.svg';

const NoteTable = ({ carId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded' // Use 'application/x-www-form-urlencoded' content type
        };
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/notes?carId='+carId,{
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

    const handleDeleteClick = async (noteId) => {
        const token = localStorage.getItem('token');
        console.log('carId: ' + noteId)
        if (noteId === null) {
          return; 
        }
        const apiUrl = 'http://localhost:8080/api/carNote/delete';
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:noteId}),
        };
        console.log(requestOptions)
        fetch(apiUrl, requestOptions).then(setData(data.filter(carNote => carNote.id !== noteId)))
      };
      
  if (data === null || data.length === 0) {
          return ''; 
      }

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Koszt
                </th>
                <th scope="col" className="px-6 py-3">
                    Przebieg
                </th>
                <th scope="col" className="px-6 py-3">
                    Opis
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                    Akcje
                </th>
            </tr>
        </thead>
        <tbody>
        {data.map((note, index) => (
          <tr key={index} className="text-white">
            <td className="px-6 py-3">{note.koszt}</td>
            <td className="px-6 py-3">{note.przebieg}</td>
            <td className="px-6 py-3">{note.opis}</td>
            <td className="flex flex-row justify-end px-6 py-3">
                <Link to={`/EditNote/${note.id}`} className="flex pr-0 ml-3" >
                    <img className="w-7 h-9" src={edit} alt="editIcon" />
                </Link>
                <button className="flex pr-0 ml-3" onClick={() => handleDeleteClick(note.id)}> 
                    <img className="w-7 h-9" src={deleteCar} alt="deleteIcon" />
                </button>
            </td>
          </tr>
        ))}
        </tbody>
    </table>
</div>
  );
};

export default NoteTable;
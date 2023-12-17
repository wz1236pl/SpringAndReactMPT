import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom"

import logo2 from '../Assets/Logo.svg'

function AddNote() {
  const navigate = useNavigate();

  const {id} = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded' // Use 'application/x-www-form-urlencoded' content type
    };

    // Serialize the form data
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    const serializedData = Object.entries(formObject)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    try {
      console.log(token)
      const response = await axios.post('http://localhost:8080/api/carNote/add?id='+id, serializedData, {
        headers: headers
      });
      // Handle response
      console.log(response.status);
      navigate('/home'); // Navigate to '/home' after form submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/home"><img className="mx-auto h-12 w-auto" src={logo2} alt="CarDiary" /></Link>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md ">

              <div className='pt-8'>
                <label htmlFor="przebieg" >
                  Przebieg
                </label>
                <input
                  id="przebieg"
                  name="przebieg"
                  type="text"
                  autoComplete="przebieg"
                  required
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Np. 120000"
                />
              </div>

              <div className='pt-8'>
                <label htmlFor="moc" >
                  koszt w PLN
                </label>
                <input
                  id="koszt"
                  name="koszt"
                  type="text"
                  autoComplete="koszt"
                  required
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Np. 150"
                />
              </div>
              
              <div className='pt-8'>
                <label htmlFor="opis" >
                  Opis
                </label>
                <textarea className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                  placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                  placeholder="Opis samochodu" 
                  name="opis" 
                  rows="10" 
                  cols="50" 
                  ></textarea>
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="group relative flex w-38 justify-center mx-auto rounded-md bg-indigo-600 py-2 px-7 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                Dodaj notatke
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default AddNote;
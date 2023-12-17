import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom"

import logo2 from '../Assets/Logo.svg'

function EditCar() {
  const navigate = useNavigate();

  const {id} = useParams();

  const [values, setValues] = useState({
    id: id,
    marka : '',
    model : '',
    rok: '',
    przebieg: '',
    moc: '',
    opis: ''
    })

    useEffect(()=> {
        axios.get('http://localhost:8080/api/cars?id='+id).then(
            res => {setValues({...values,
            id: res.data.id,
            marka : res.data.marka,
            model : res.data.model,
            rok: res.data.rok,
            przebieg: res.data.przebieg,
            moc: res.data.moc,
            opis: res.data.opis})
        })}, [])

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
      const response = await axios.put('http://localhost:8080/api/cars/update', serializedData, {
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
            <input type="text" id="id" name="id" class="invisible" required value={values.id}/>
            <div className="-space-y-px rounded-md ">
              
              <div className='pt-8'>
                <label htmlFor="marka" >
                  Marka
                </label>
                <input
                  id="marka"
                  name="marka"
                  type="text"
                  autoComplete="marka"
                  required
                  value={values.marka}
                  onChange={e => setValues({...values, marka: e.target.value})}
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Np. Audi"
                />
              </div>
              
              <div className='pt-8'>
                <label htmlFor="model" >
                  Model
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  autoComplete="model"
                  required
                  value={values.model}
                  onChange={e => setValues({...values, model: e.target.value})}
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Np. A4"
                />
              </div>

              <div className='pt-8'>
                <label htmlFor="rok" >
                  Rok
                </label>
                <input
                  id="rok"
                  name="rok"
                  type="text"
                  autoComplete="rok"
                  required
                  value={values.rok}
                  onChange={e => setValues({...values, rok: e.target.value})}
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Np. 2001"
                  pattern="[0-9]{4}"
                />
              </div>

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
                  value={values.przebieg}
                  onChange={e => setValues({...values, przebieg: e.target.value})}
                  className="relative block w-full rounded-lg border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                  placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Np. 120000"
                />
              </div>

              <div className='pt-8'>
                <label htmlFor="moc" >
                  Moc
                </label>
                <input
                  id="moc"
                  name="moc"
                  type="text"
                  autoComplete="moc"
                  required
                  value={values.moc}
                  onChange={e => setValues({...values, moc: e.target.value})}
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
                  value={values.opis}
                  onChange={e => setValues({...values, opis: e.target.value})}
                  ></textarea>
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="group relative flex w-38 justify-center mx-auto rounded-md bg-indigo-600 py-2 px-7 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                Aktualizuj pojazd
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default EditCar;
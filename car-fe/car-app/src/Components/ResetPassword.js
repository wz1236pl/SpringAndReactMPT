import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo2 from '../Assets/Logo.svg';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newPassword !== confirmNewPassword) {
        toast.error("Nowe hasła nie są identyczne");
        return;
      }

      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8080/user/password',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Hasło zostało zresetowane');
        navigate('/home');
      } else {
        toast.error('Wystąpił błąd podczas resetowania hasła');
      }
    } catch (error) {
      console.error('Błąd podczas resetowania hasła', error.response);

      if (error.response && error.response.status === 403) {
        toast.error('Nieprawidłowe hasło');
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Wystąpił błąd podczas resetowania hasła');
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center">
            <Link to="/home">
              <img className="mx-auto h-12 w-auto" src={logo2} alt="Moto Moto" />
            </Link>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="old-password" className="sr-only">
                  Stare hasło
                </label>
                <input
                  id="old-password"
                  name="oldPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Stare hasło"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className='pt-4'>
                <label htmlFor="new-password" className="sr-only">
                  Nowe hasło
                </label>
                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Nowe hasło"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className='pt-4'>
                <label htmlFor="confirm-new-password" className="sr-only">
                  Potwierdź nowe hasło
                </label>
                <input
                  id="confirm-new-password"
                  name="confirmNewPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Potwierdź nowe hasło"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Resetuj hasło
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;

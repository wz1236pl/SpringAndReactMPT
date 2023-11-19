import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const Home = () => {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    document.title = 'CarDiary'

    if (storedEmail) {
      setLoggedInUserEmail(storedEmail);
      toast.success(`Witaj ${storedEmail}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    setLoggedInUserEmail('');
  };

  return (
    <div>
      <Header />
      {loggedInUserEmail && (
        <button onClick={handleLogout}>Wyloguj</button>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;

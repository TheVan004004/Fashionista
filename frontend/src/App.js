
import Header from './layout/header';
import Footer from './layout/footer';
import { Outlet } from 'react-router-dom';
import Filter from './components/Filter';
import { useState } from 'react';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
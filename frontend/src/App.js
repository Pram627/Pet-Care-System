import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VisitSearchPage from './pages/VisitSearchPage';

function App() {
  return (
    <div className="app-wrapper">
      <header className="header">
        <h1>Pet Care Visit Management</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Search & Update Visit</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<VisitSearchPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

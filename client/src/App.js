import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FullScrollLayout from './components/FullScrollLayout';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <div className="app">
          <Navbar />
          <main className="app__main">
            <Routes>
              <Route path="*" element={<FullScrollLayout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </BrowserRouter>
  );
}

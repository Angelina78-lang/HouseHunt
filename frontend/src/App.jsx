import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import Agents from './pages/Agents';

function App() {
  return (
    <Router>
      <Header />
      <main className="pb-5" style={{ minHeight: '80vh', backgroundColor: 'var(--goibibo-bg)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/login" element={<div className="container mt-4"><Login /></div>} />
          <Route path="/register" element={<div className="container mt-4"><Register /></div>} />
          <Route path="/property/:id" element={<div className="container mt-4"><PropertyDetails /></div>} />
          <Route path="/dashboard" element={<div className="container mt-4"><Dashboard /></div>} />
          <Route path="/admin" element={<div className="container mt-4"><AdminDashboard /></div>} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;

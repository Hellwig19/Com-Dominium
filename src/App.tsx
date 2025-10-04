import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import HomePortaria from './pages/Home_portaria';
import HomeZeladoria from './pages/Home_Zeladoria';

const App = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 shadow-md">
        <ul className="flex space-x-6">
          <li>
            <Link to="/login" className="text-white font-medium hover:text-gray-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/portaria" className="text-white font-medium hover:text-gray-300">
              Portaria
            </Link>
          </li>
          <li>
            <Link to="/zeladoria" className="text-white font-medium hover:text-gray-300">
              Zeladoria
            </Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portaria" element={<HomePortaria />} />
          <Route path="/zeladoria" element={<HomeZeladoria />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
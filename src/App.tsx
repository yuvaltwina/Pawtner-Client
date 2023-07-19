import Navbar from './components/navbar/Navbar';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Primary from './pages/primary/Primary';
import Favorites from './pages/favorites/Favorites';
import Breeds from './pages/breeds/Breeds';
import NotFound from './pages/notFound/NotFound';
import MyDogs from './pages/myDogs/MyDogs';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import RequireAuth from './HOCS/RequireAuth';
import Admin from './admin/Admin';
import RequireAdmin from './HOCS/RequireAdmin';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Primary />} />
        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          }
        />
        <Route path="/breeds" element={<Breeds />} />
        <Route
          path="/myDogs"
          element={
            <RequireAuth>
              <MyDogs />
            </RequireAuth>
          }
        ></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

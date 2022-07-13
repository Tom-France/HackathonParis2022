import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tags from './routes/tags';
import Missions from './routes/missions';
import Tag from './routes/tag';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline } from '@mui/material';

import { Provider } from "react-redux";

import { store } from './reducers';
import NewTag from './routes/newTag';
import Sessions from './routes/session';
import './fonts/Olive Days.ttf';
import Olive from './fonts/Olive Days.ttf';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Explen from './routes/Explen';
import Start from './routes/Start';


const theme = createTheme({
  typography: {
    fontFamily: 'Olive Days',
  },
  components: {
    MuiCssBaseline: {
      stylesOverrides:`
      @font-face {
        font-family: 'Olive Days';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Olive Days'), url(${Olive}) format('ttf');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
    `}
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App sx={{
        fontFamily: 'Olive Days',
      }} />} >
            <Route path="/tags" element={<Tags />}>
              <Route
                index
                element={<NewTag />}
              />
              <Route path=':id' element={<Tag />} />
            </Route>
            <Route path="/missions" element={<Missions />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
            <Route path="/sessions" element={<Sessions />} />
          </Route>
          <Route path="/explen" element={<Explen />} />
          <Route path="/start" element={<Start />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

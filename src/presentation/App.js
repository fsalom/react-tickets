import SignIn from './modules/sign-in/SignIn';
import SignInSide from './modules/sign-in-side/SignInSide';
import Dashboard from './modules/dashboard/Dashboard';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AuthRepositoryImpl from "../data/repositories/authRepositoryImpl";
import LoginUseCase from "../domain/usecases/loginUseCase";

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route
                  path="/login"
                  element={<SignInSide loginUseCase={loginUseCase} />}
              />
              <Route
                  path="/home"
                  element={<Dashboard />}
              />
              <Route
                  path="*"
                  element={<Navigate to="/login" />}
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;

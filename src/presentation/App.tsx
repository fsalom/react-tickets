import SignInSide from './modules/sign-in-side/SignInSide';
import './App.css';
import '@fontsource/roboto';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AuthRepositoryImpl from "../data/repositories/auth-repository-impl";
import LoginUseCase from "../domain/usecases/login-use-case";
import AppTheme from "../AppTheme";

const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);

function App() {
  return (
      <AppTheme>
          <BrowserRouter>
              <Routes>
                  <Route
                      path="/login"
                      element={<SignInSide loginUseCase={loginUseCase} />}
                  />
                  <Route
                      path="/home"
                      element={<Navigate to="/login" />}
                  />
                  <Route
                      path="*"
                      element={<Navigate to="/login" />}
                  />
              </Routes>
          </BrowserRouter>
      </AppTheme>
  );
}

export default App;

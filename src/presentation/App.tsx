import './App.css';
import '@fontsource/roboto';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppTheme from "./theme/AppTheme";
import SignInSideView from "./pages/sign-in-side/View";

function App() {
  return (
      <AppTheme>
          <BrowserRouter>
              <Routes>
                  <Route
                      path="/login"
                      element={<SignInSideView />}
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

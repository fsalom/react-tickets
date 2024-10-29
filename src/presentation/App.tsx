import './App.css';
import '@fontsource/roboto';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppTheme from "./theme/AppTheme";
import SignInSideView from "./pages/sign-in-side/View";
import {AuthProvider} from "../_moshimoshi/context/AuthContext";
import ProtectedRoute from '../_moshimoshi/route/ProtectedRoute';
import HomeView from "./pages/home/View";


function App() {
  return (
      <AuthProvider>
          <AppTheme>
              <BrowserRouter>
                  <Routes>
                      <Route
                          path="/login"
                          element={<SignInSideView />}
                      />
                      <Route
                          path="/home"
                          element={
                              <ProtectedRoute>
                                  <HomeView />
                              </ProtectedRoute>
                          }
                      />
                      <Route
                          path="*"
                          element={<Navigate to="/login" />}
                      />
                  </Routes>
              </BrowserRouter>
          </AppTheme>
      </AuthProvider>
  );
}

export default App;

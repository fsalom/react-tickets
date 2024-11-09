import './App.css';
import '@fontsource/roboto';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignInSideView from "./pages/sign-in-side/View";
import {AuthProvider} from "../_moshimoshi/context/AuthContext";
import ProtectedRoute from '../_moshimoshi/route/ProtectedRoute';
import HomeView from "./pages/home/View";
import SignUpView from "./pages/sign-up/View";
import {Home} from "@mui/icons-material";
import AppTheme from "./theme/AppTheme";
import {Config} from "../config";


function App() {
  return (
      <AuthProvider authenticator={Config.getInstance().moshimoshi}>
          <AppTheme>
              <BrowserRouter>
                  <Routes>
                      <Route
                          path="/login"
                          element={<SignInSideView />}
                      />
                      <Route
                          path="/sign-up"
                          element={<SignUpView />}
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

import SignIn from './sign-in/SignIn';
import SignInSide from './sign-in-side/SignInSide';
import Dashboard from './dashboard/Dashboard';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <div>
            <Dashboard />
        </div>
      </ThemeProvider>
  );
}

export default App;

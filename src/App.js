import SignIn from './sign-in/SignIn';
import SignInSide from './sign-in-side/SignInSide';
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
            <SignInSide />
        </div>
      </ThemeProvider>
  );
}

export default App;

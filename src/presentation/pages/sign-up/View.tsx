import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, SitemarkIcon } from './components/CustomIcons';
import { useSignUpViewModel } from "./ViewModel";
import AuthRepositoryImpl from "../../../data/repositories/AuthRepositoryImpl";
import RegisterUseCase from "../../../domain/usecases/authentication/RegisterUseCase";
import ValidateEmailUseCase from "../../../domain/usecases/validation/ValidateEmailUseCase";
import ValidatePasswordUseCase from "../../../domain/usecases/validation/ValidatePasswordUseCase";
import ValidateNameUseCase from "../../../domain/usecases/validation/ValidateNameUseCase";
import {Config} from "../../../config";
import AuthAPIDataSourceImpl from "../../../data/datasources/authentication/remote/AuthAPIDataSourceImpl";
import LoginUseCase from "../../../domain/usecases/authentication/LoginUseCase";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUpView() {
  const moshimoshi =  Config.getInstance().moshimoshi
  const authDataSource= new AuthAPIDataSourceImpl(moshimoshi)
  const authRepository = new AuthRepositoryImpl(authDataSource);
  const registerUseCase = new RegisterUseCase(authRepository);
  const validateEmailUseCase = new ValidateEmailUseCase();
  const validatePasswordUseCase = new ValidatePasswordUseCase();
  const validateNameUseCase = new ValidateNameUseCase();

  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    nameError,
    nameErrorMessage,
    handleSubmit,
  } = useSignUpViewModel({
    registerUseCase,
    validateEmailUseCase,
    validatePasswordUseCase,
    validateNameUseCase
  });

  return (
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
              />
            </FormControl>
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
            />
            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="/login" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
        </Card>
      </SignUpContainer>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInViewModelProps {
    loginUseCase: {
        execute: (email: string, password: string) => Promise<void>;
    };
    validateEmailUseCase: {
        execute: (email: string) => boolean;
    };
    validatePasswordUseCase: {
        execute: (password: string) => boolean;
    };
}

export const useSignInViewModel = ({
                                       loginUseCase,
                                       validateEmailUseCase,
                                       validatePasswordUseCase,
                                   }: SignInViewModelProps) => {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateInputs = (email: string, password: string): boolean => {
        const isValidEmail = validateEmailUseCase.execute(email);
        const isValidPassword = validatePasswordUseCase.execute(password);

        setEmailError(!isValidEmail);
        setEmailErrorMessage(isValidEmail ? '' : 'Please enter a valid email address.');
        setPasswordError(!isValidPassword);
        setPasswordErrorMessage(isValidPassword ? '' : 'Password must be at least 6 characters long.');

        return isValidEmail && isValidPassword;
    };

    const handleLogin = async (email: string, password: string) => {
        if (validateInputs(email, password)) {
            try {
                await loginUseCase.execute(email, password);
                navigate('/home');
            } catch (error) {
                alert('Credenciales incorrectas');
            }
        }
    };

    return {
        emailError,
        emailErrorMessage,
        passwordError,
        passwordErrorMessage,
        handleLogin,
    };
};

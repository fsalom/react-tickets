import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface SignUpViewModelProps {
    registerUseCase: {
        execute: (email: string, password: string, name: string) => Promise<void>;
    };
    validateEmailUseCase: {
        execute: (email: string) => boolean;
    };
    validatePasswordUseCase: {
        execute: (password: string) => boolean;
    };
    validateNameUseCase: {
        execute: (name: string) => boolean;
    };
}

export const useSignUpViewModel = ({
                                       registerUseCase,
                                       validateEmailUseCase,
                                       validatePasswordUseCase,
                                       validateNameUseCase,
                                   }: SignUpViewModelProps) => {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateInputs = (email: string, password: string, name: string): boolean => {
        const isValidEmail = validateEmailUseCase.execute(email);
        const isValidPassword = validatePasswordUseCase.execute(password);
        const isValidName = validateNameUseCase.execute(name);

        setEmailError(!isValidEmail);
        setEmailErrorMessage(isValidEmail ? '' : 'Por favor introduce un email válido.');
        setPasswordError(!isValidPassword);
        setPasswordErrorMessage(isValidPassword ? '' : 'Password debe tener al menos 6 carácteres de longitud.');
        setNameError(!isValidName);
        setNameErrorMessage(isValidPassword ? '' : 'Name es requerido.');

        return isValidEmail && isValidPassword && isValidName;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        if (validateInputs(email, password, name)) {
            try {
                await registerUseCase.execute(email, password, name);
                navigate('/home');
            } catch (error) {
                alert('Se ha producido un error registrando el usuario');
            }
        }
    };

    return {
        emailError,
        emailErrorMessage,
        passwordError,
        passwordErrorMessage,
        nameError,
        nameErrorMessage,
        handleSubmit,
    };
};

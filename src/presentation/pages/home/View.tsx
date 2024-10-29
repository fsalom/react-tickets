import AuthRepositoryImpl from "../../../data/repositories/AuthRepositoryImpl";
import LoginUseCase from "../../../domain/usecases/authentication/LoginUseCase";
import ValidateEmailUseCase from "../../../domain/usecases/validation/ValidateEmailUseCase";
import ValidatePasswordUseCase from "../../../domain/usecases/validation/ValidatePasswordUseCase";
import {useSignInViewModel} from "../sign-in-side/ViewModel";
import SignInCard from "../sign-in-side/components/SignInCard";
import * as React from "react";

export default function HomeView() {
    const authRepository = new AuthRepositoryImpl();
    const loginUseCase = new LoginUseCase(authRepository);
    const validateEmailUseCase = new ValidateEmailUseCase();
    const validatePasswordUseCase = new ValidatePasswordUseCase();

    const signInViewModel = useSignInViewModel({
        loginUseCase,
        validateEmailUseCase,
        validatePasswordUseCase,
    });

    return (
        <SignInCard
            viewModel={signInViewModel}
        />
    );
}
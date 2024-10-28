import * as React from 'react';
import Stack from '@mui/material/Stack';
import SignInCard from './components/SignInCard';
import Content from './components/Content';
import { useSignInViewModel } from './ViewModel';
import LoginUseCase from "../../../domain/usecases/authentication/LoginUseCase";
import ValidateEmailUseCase from "../../../domain/usecases/validation/ValidateEmailUseCase";
import ValidatePasswordUseCase from "../../../domain/usecases/validation/ValidatePasswordUseCase";
import AuthRepositoryImpl from "../../../data/repositories/AuthRepositoryImpl";

export default function SignInSideView() {
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
        <Stack
            direction="column"
            component="main"
            sx={[
                {
                    justifyContent: 'center',
                    height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
                    marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
                    minHeight: '100%',
                },
                (theme) => ({
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        zIndex: -1,
                        inset: 0,
                        backgroundImage:
                            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                        backgroundRepeat: 'no-repeat',
                        ...theme.applyStyles('dark', {
                            backgroundImage:
                                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                        }),
                    },
                }),
            ]}
        >
            <Stack
                direction={{ xs: 'column-reverse', md: 'row' }}
                sx={{
                    justifyContent: 'center',
                    gap: { xs: 6, sm: 12 },
                    p: 2,
                    mx: 'auto',
                }}
            >
                <Stack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    sx={{
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: { xs: 2, sm: 4 },
                        m: 'auto',
                    }}
                >
                    <Content />
                    <SignInCard
                        viewModel={signInViewModel}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}

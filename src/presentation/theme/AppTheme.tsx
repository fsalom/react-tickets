import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { ThemeOptions } from '@mui/material/styles';

interface AppThemeProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme({
                                     children,
                                     disableCustomTheme,
                                     themeComponents,
                                 }: AppThemeProps) {
    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                typography: {
                    fontFamily: '"Roboto", "Arial", sans-serif',
                    h1: { fontFamily: '"Roboto", sans-serif', fontWeight: 700 },
                    h2: { fontFamily: '"Roboto", sans-serif', fontWeight: 600 },
                    body1: { fontFamily: '"Roboto", sans-serif' },
                    body2: { fontFamily: '"Roboto", sans-serif' },
                },
                components: {
                    ...themeComponents,
                },
            });
    }, [disableCustomTheme, themeComponents]);

    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            </ThemeProvider>
    );
}

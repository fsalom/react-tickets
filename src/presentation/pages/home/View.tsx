import * as React from "react";
import PageViewsBarChart from "./components/PageViewsBarChart";
import Grid from "@mui/material/Grid2";
import StatCard, {StatCardProps} from "./components/StatCard";
import Box from "@mui/material/Box";
import SideMenu from "./components/SideMenu";
import AppNavbar from "./components/AppNavbar";
import Stack from "@mui/material/Stack";
import Header from "./components/Header";
import CustomizedDataGrid from "./components/CustomizedDataGrid";
import {Config} from "../../../config";
import {useStatsViewModel} from "./ViewModel";
import StatsAPIDataSourceImpl from "../../../data/datasources/stats/remote/StatsAPIDataSource";
import StatsRepositoryImpl from "../../../data/repositories/StatsRepositoryImpl";
import GetStatsUseCase from "../../../domain/usecases/stats/GetStatsUseCase";
import StatsMapper from "../../../data/datasources/stats/remote/StatsMapper";

const data: StatCardProps[] = [
    {
        title: 'Users',
        value: '14k',
        interval: 'Last 30 days',
        trend: 'up',
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
            360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
        ],
    },
    {
        title: 'Conversions',
        value: '325',
        interval: 'Last 30 days',
        trend: 'down',
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
            780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
        ],
    },
    {
        title: 'Event count',
        value: '200k',
        interval: 'Last 30 days',
        trend: 'neutral',
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
            520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
        ],
    },
];

export default function HomeView() {
    const moshimoshi = Config.getInstance().moshimoshi;
    const mapper = new StatsMapper()
    const statsDataSource = new StatsAPIDataSourceImpl(moshimoshi, mapper);
    const statsRepository = new StatsRepositoryImpl(statsDataSource);
    const getStatsUseCase = new GetStatsUseCase(statsRepository);

    const viewModel = useStatsViewModel(
        { getStatsUseCase }
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />
            <Box
                component="main"
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <Header />
                    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                        <Grid
                            container
                            spacing={2}
                            columns={12}
                            sx={{mb: (theme) => theme.spacing(2)}}
                        >
                            {data.map((card, index) => (
                                <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                                    <StatCard {...card} />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            columns={12}
                            sx={{mb: (theme) => theme.spacing(2)}}
                        >
                            <PageViewsBarChart/>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            columns={12}
                            sx={{mb: (theme) => theme.spacing(2)}}
                        >
                            <CustomizedDataGrid />
                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
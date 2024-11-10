import {useEffect, useState} from 'react';
import Stats from "../../../domain/entities/Stats";
import GetStatsUseCase from "../../../domain/usecases/stats/GetStatsUseCase";

interface StatsViewModelProps {
    getStatsUseCase: GetStatsUseCase;
}

export const useStatsViewModel = ({
                                       getStatsUseCase
                                   }: StatsViewModelProps) => {

    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await getStatsUseCase.execute();
                setStats(stats);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar las estadísticas de tickets');
                setLoading(false);
            }
        };

        fetchData();
    }, [getStatsUseCase]);

    return {
        stats,
        loading,
        error,
    };
};
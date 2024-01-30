import { useQuery } from 'react-query';
import { TeamService } from '../services/TeamService';

export const useTeam = () => useQuery('teams', () => TeamService.getAll(), { keepPreviousData: true });

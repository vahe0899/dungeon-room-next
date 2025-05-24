import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { Event, Story } from '@/types';

export type ApiStoriesAndEventsRequest = Partial<{
    limit: number;
    page: number;
}>;

export type ApiStoriesAndEventsResponse = {
    stories: Story[];
    events: Event[];
};

export const getStoriesAndEvents = (): Promise<ApiStoriesAndEventsResponse> =>
    Axios.get<ApiStoriesAndEventsResponse>('https://dungeon-room.ru/get_data.php').then((res) => res.data);

export const useStoriesQuery = (initialData?: ApiStoriesAndEventsResponse) =>
    useQuery({
        queryKey: ['Stories'],
        queryFn: () => getStoriesAndEvents(),
        initialData,
        placeholderData: (prev) => prev,
    });

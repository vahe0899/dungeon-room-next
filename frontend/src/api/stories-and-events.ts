import { useQuery } from '@tanstack/react-query';
import { Event, Story } from '@/types';
import { axiosAPI } from './axios-instance';

export type ApiStoriesAndEventsRequest = Partial<{
    limit: number;
    page: number;
}>;

export type ApiStoriesAndEventsResponse = {
    stories: Story[];
    events: Event[];
};

export const getStoriesAndEvents = (): Promise<ApiStoriesAndEventsResponse> =>
    axiosAPI.get<ApiStoriesAndEventsResponse>('/get_data.php').then((res) => res.data);

export const useStoriesQuery = (initialData?: ApiStoriesAndEventsResponse) =>
    useQuery({
        queryKey: ['Stories'],
        queryFn: () => getStoriesAndEvents(),
        initialData,
        placeholderData: (prev) => prev,
    });

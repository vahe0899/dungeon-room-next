import { Cookies } from 'react-cookie';
import { CommonPageProps } from '@/types';

export const getCommonPageProps = async (cookies?: Partial<{ [key: string]: string }>): Promise<CommonPageProps> => {
    return {
        meta: {
            baseTitle: 'Dungeon Room',
            description: 'DUNGEON ROOM / ИММЕРСИВНОЕ НАСТОЛЬНОЕ ПРИКЛЮЧЕНИЕ',
            ogImage: '/img/og-image.jpg',
        },
        cookies: cookies ? new Cookies(cookies).getAll() : null,
        breadcrumbs: [],
    };
};

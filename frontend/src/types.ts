export interface ApiResponse<T = unknown> {
    status: 'success' | 'error';
    data?: T;
    errors?: { message: string }[];
}

export interface BasePageProps {
    bodyClass?: string;
    cookies: Partial<{ [key: string]: string }> | null;
}

export interface CommonPageProps extends BasePageProps {
    meta: Partial<{
        baseTitle: string;
        title: string;
        description: string;
        ogImage: string;
    }>;
    breadcrumbs: { text: string; href: string }[];
}

export interface ImageShape {
    src: string;
    width: number;
    height: number;
    alt?: string;
}

export type VideoShape = {
    type: string;
    src: string;
}[];

export type NonUndefined<T> = T extends undefined ? never : T;

export type Story = {
    // id: number;
    imgSrc: string;
    frontTitle: string;
    backText: string;
    playersCount: string;
    genre: string;
    difficult: string;
    duration: string;
    setting: string;
    worldFreedom: string;
    theme: string;
    gameSystem: string;
};

export type Event = {
    id: number;
    date: string;
    isDayBusy: string;
    isEveningBusy: string;
};

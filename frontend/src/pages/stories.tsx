import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getCommonPageProps } from '@/api/common';
import { getStoriesAndEvents } from '@/api/stories-and-events';
import { useSetOpenedPopupsState } from '@/atoms/opened-popups';
import DefaultLayout from '@/components/layout/DefaultLayout';
import CardPopup from '@/components/shared/CardPopup';
import { CARD_POPUP_NAME } from '@/components/shared/CardPopup/CardPopup';
import { CommonPageProps, NonUndefined, Story } from '@/types';

const StoriesPage = ({ stories }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { openPopup, closePopup } = useSetOpenedPopupsState();

    return (
        <DefaultLayout>
            <section className="section first-section">
                <h1 className="page-title">Сюжеты</h1>
                <div className="stories-list">
                    {stories.map((story, index) => (
                        <div className="stories-list-item" key={index} onClick={() => openPopup(CARD_POPUP_NAME)}>
                            <div className="card-face card-face-front">
                                <div className="storie-img-container">
                                    <img
                                        className="storie-img"
                                        src={`https://dungeon-room.ru/${story.imgSrc}`}
                                        alt={story.frontTitle}
                                    />
                                </div>
                                <div className="front-description-title">{story.frontTitle}</div>
                                <div className="front-description-text">Подробнее...</div>
                            </div>
                        </div>
                    ))}
                </div>
                <CardPopup />
            </section>
        </DefaultLayout>
    );
};

export default StoriesPage;

type StoriesPageProps = NonUndefined<
    CommonPageProps & {
        stories: Story[];
    }
>;

export const getStaticProps: GetStaticProps<StoriesPageProps> = async () => {
    const [commonPageProps, storiesResponse] = await Promise.all([getCommonPageProps(), getStoriesAndEvents()]);
    const stories = storiesResponse.stories || [];

    return {
        props: {
            ...commonPageProps,
            bodyClass: 'stories-page',
            meta: {
                ...commonPageProps.meta,
                title: 'Сюжеты',
                description: 'Ознакомьтесь с сюжетами для ваших приключений!',
            },
            stories,
        } satisfies StoriesPageProps,
    };
};

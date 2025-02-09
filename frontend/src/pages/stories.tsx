import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { getCommonPageProps } from '@/api/common';
import { getStoriesAndEvents } from '@/api/stories-and-events';
import { useSetOpenedPopupsState } from '@/atoms/opened-popups';
import DefaultLayout from '@/components/layout/DefaultLayout';
import CardPopup from '@/components/shared/CardPopup';
import { CARD_POPUP_NAME } from '@/components/shared/CardPopup/CardPopup';
import Dropdown from '@/components/shared/Dropdown';
import ArrSVG from '@/svg/arr.svg';
import { CommonPageProps, NonUndefined, Story } from '@/types';

const StoriesPage = ({ stories }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { openPopup } = useSetOpenedPopupsState();
    const [activeStory, setActiveStory] = useState<Story>();

    // Состояние фильтров
    const [filters, setFilters] = useState({
        playersCount: [] as string[],
        genre: [] as string[],
        difficult: [] as string[],
        duration: [] as string[],
        setting: [] as string[],
        worldFreedom: [] as string[],
        theme: [] as string[],
        gameSystem: [] as string[],
    });

    const fieldLabels: Record<keyof typeof filters, string> = {
        playersCount: 'Количество игроков',
        genre: 'Жанр',
        difficult: 'Сложность',
        duration: 'Продолжительность',
        setting: 'Сеттинг',
        worldFreedom: 'Свобода мира',
        theme: 'Тема',
        gameSystem: 'Система игры',
    };

    // Генерация уникальных значений для фильтров
    const getUniqueValues = (field: keyof Story) => {
        return Array.from(
            new Set(stories.map((story) => story[field].trim().toLowerCase()).filter((value) => value !== '')),
        );
    };

    // Обработчик изменения фильтра
    const toggleFilter = (field: keyof typeof filters, value: string) => {
        setFilters((prevFilters) => {
            const currentValues = prevFilters[field];
            const isSelected = currentValues.includes(value);
            return {
                ...prevFilters,
                [field]: isSelected
                    ? currentValues.filter((item) => item !== value) // Удаляем, если уже выбран
                    : [...currentValues, value], // Добавляем, если ещё не выбран
            };
        });
    };

    // Фильтрация историй
    const filteredStories = stories.filter((story) =>
        Object.entries(filters).every(([field, values]) =>
            values.length > 0 ? values.includes(story[field as keyof Story].trim().toLowerCase()) : true,
        ),
    );

    return (
        <DefaultLayout>
            <section className="section first-section stories-section">
                <h1 className="page-title">Сюжеты</h1>
                <div className="story-filters">
                    {Object.keys(filters).map((filterKey) => {
                        const field = filterKey as keyof typeof filters;
                        const uniqueValues = getUniqueValues(field);

                        return (
                            <Dropdown key={field} id={field} className="story-dropdown">
                                <Dropdown.Toggler className="story-select-btn">
                                    <div className="text-xs">{fieldLabels[field]}</div>
                                    <ArrSVG className="story-arrow-svg" />
                                </Dropdown.Toggler>
                                <Dropdown.Content className="story-filter__content" position="bottom-right">
                                    <ul className="list-unstyled menu-dropdown-list">
                                        {uniqueValues.map((value) => (
                                            <Dropdown.Picker
                                                key={value}
                                                className={classNames('story-select-item text-xs', {
                                                    'is-active': filters[field].includes(value),
                                                })}
                                                onClick={() => toggleFilter(field, value)}
                                                keepOpen
                                            >
                                                {value}
                                            </Dropdown.Picker>
                                        ))}
                                    </ul>
                                </Dropdown.Content>
                            </Dropdown>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    {filteredStories.length > 0 ? (
                        <motion.div
                            className="stories-list"
                            key={JSON.stringify(filters)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredStories.map((story, i) => (
                                <div
                                    className="stories-list-item"
                                    key={i}
                                    onClick={() => {
                                        setActiveStory(story);
                                        openPopup(CARD_POPUP_NAME);
                                    }}
                                >
                                    <div className="card-face card-face-front">
                                        <div className="storie-img-container">
                                            <img
                                                className="storie-img"
                                                src={`https://dungeon-room.ru/${story.imgSrc}`}
                                                alt={story.frontTitle}
                                            />
                                        </div>
                                        <div
                                            className="front-description-title"
                                            dangerouslySetInnerHTML={{
                                                __html: `${story.frontTitle}`,
                                            }}
                                        ></div>
                                        <div className="front-description-text-wrapper">
                                            {story.playersCount && (
                                                <div className="front-description-text">{story.playersCount}</div>
                                            )}
                                            {story.genre && <div className="front-description-text">{story.genre}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-stories"
                            className="stories-list no-stories"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            Наш мастер ещё не придумал таких сюжетов
                        </motion.div>
                    )}
                </AnimatePresence>

                <CardPopup activeStory={activeStory} />
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

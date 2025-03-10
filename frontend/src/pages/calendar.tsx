import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { getCommonPageProps } from '@/api/common';
import { getStoriesAndEvents } from '@/api/stories-and-events';
import DefaultLayout from '@/components/layout/DefaultLayout';
import ArrSVG from '@/svg/arr.svg';
import { CommonPageProps, Event, NonUndefined } from '@/types';

const StoriesPage = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const eventsResponse = await getStoriesAndEvents();
                setEvents(eventsResponse.events || []);
            } catch (error) {
                console.error('Ошибка загрузки событий:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handlePrevMonth = () => {
        setCurrentDate((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => addMonths(prev, 1));
    };

    const getWeekDayShort = (date: Date): string => {
        const dayIndex = format(date, 'i', { locale: ru });
        const shortWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        return shortWeekDays[Number(dayIndex) - 1];
    };

    const getCalendarDays = () => {
        const firstDayOfMonth = startOfMonth(currentDate);
        const lastDayOfMonth = endOfMonth(currentDate);
        const calendarStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
        const calendarEnd = endOfMonth(currentDate);

        return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((date) => {
            const dateString = format(date, 'yyyy-MM-dd');
            const event = events.find((event) => event.date === dateString);
            const isCurrentDay = isToday(date);
            const isEmpty = date < firstDayOfMonth;

            return (
                <li
                    key={dateString}
                    className={`day ${isEmpty ? 'empty' : ''} ${isCurrentDay ? 'today' : ''} ${
                        event ? 'has-event' : ''
                    }`}
                >
                    {!isEmpty && (
                        <>
                            <time dateTime={dateString}>
                                {format(date, 'd')} <span className="week-day">{getWeekDayShort(date)}</span>
                            </time>
                            <span className={`day-time ${event?.isDayBusy === '1' ? 'busy' : ''}`}>день</span>
                            <span className={`day-time ${event?.isEveningBusy === '1' ? 'busy' : ''}`}>вечер</span>
                        </>
                    )}
                </li>
            );
        });
    };

    return (
        <DefaultLayout>
            <section className="section first-section calendar-section">
                <h1 className="page-title">Свободные даты</h1>
                <p className="calendar-subtitle">
                    Начало дневных игр с 12:00, начало вечерних игр 19:00;
                    <br />
                    <br />
                    Для подтверждения бронирования предоплату не берем
                    <br />
                    <br />
                    Для бронирования писать в{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline is-active"
                        href="https://t.me/DungeonRoom_Master"
                    >
                        социальные сети
                    </a>
                </p>
                <div className="calendar-buttons">
                    <button
                        id="prevMonth"
                        className="prev-month-button"
                        onClick={handlePrevMonth}
                        disabled={format(currentDate, 'yyyy-MM') === format(today, 'yyyy-MM')}
                    >
                        <ArrSVG />
                    </button>
                    <span id="currentMonthYear" className="current-month">
                        {format(currentDate, 'LLLL yyyy', { locale: ru })}
                    </span>
                    <button id="nextMonth" className="next-month-button" onClick={handleNextMonth}>
                        <ArrSVG />
                    </button>
                </div>
                {loading ? <p>Загрузка...</p> : <ul className="calendar">{getCalendarDays()}</ul>}
            </section>
        </DefaultLayout>
    );
};

export default StoriesPage;

type StoriesPageProps = NonUndefined<CommonPageProps>;

export const getStaticProps: GetStaticProps<StoriesPageProps> = async () => {
    const [commonPageProps] = await Promise.all([getCommonPageProps()]);

    return {
        props: {
            ...commonPageProps,
            bodyClass: 'calendar-page',
            meta: {
                title: 'Календарь',
                baseTitle: 'Dungeon Room',
                description: 'Просмотр свободных дат.',
            },
        } satisfies StoriesPageProps,
    };
};

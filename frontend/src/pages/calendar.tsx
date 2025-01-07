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
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { getCommonPageProps } from '@/api/common';
import { getStoriesAndEvents } from '@/api/stories-and-events';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { CommonPageProps, Event, NonUndefined } from '@/types';

const StoriesPage = ({ events }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);

    const handlePrevMonth = () => {
        setCurrentDate((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => addMonths(prev, 1));
    };

    const getWeekDayShort = (date: Date): string => {
        const dayIndex = format(date, 'i', { locale: ru }); // Получаем номер дня недели (1 = пн, 7 = вс)
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
                <div className="calendar-buttons">
                    <button
                        id="prevMonth"
                        className="prev-month-button"
                        onClick={handlePrevMonth}
                        disabled={format(currentDate, 'yyyy-MM') === format(today, 'yyyy-MM')}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L3 5L7 9" stroke="white" />
                        </svg>
                    </button>
                    <span id="currentMonthYear" className="current-month">
                        {format(currentDate, 'LLLL yyyy', { locale: ru })}
                    </span>
                    <button id="nextMonth" className="next-month-button" onClick={handleNextMonth}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L3 5L7 9" stroke="white" />
                        </svg>
                    </button>
                </div>
                <ul className="calendar">{getCalendarDays()}</ul>
            </section>
        </DefaultLayout>
    );
};

export default StoriesPage;

type StoriesPageProps = NonUndefined<
    CommonPageProps & {
        events: Event[];
    }
>;

export const getStaticProps: GetStaticProps<StoriesPageProps> = async () => {
    const [commonPageProps, eventsResponse] = await Promise.all([getCommonPageProps(), getStoriesAndEvents()]);
    const events = eventsResponse.events || [];

    return {
        props: {
            ...commonPageProps,
            bodyClass: 'calendar-page',
            meta: {
                title: 'Календарь',
                description: 'Просмотр свободных дат.',
            },
            events,
        } satisfies StoriesPageProps,
    };
};

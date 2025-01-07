import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getCommonPageProps } from '@/api/common';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Link from '@/components/shared/Link';
import InstaSVG from '@/svg/insta.svg';
import TelSVG from '@/svg/tel.svg';
import TgSVG from '@/svg/tg.svg';
import VkSVG from '@/svg/vk.svg';
import { CommonPageProps, NonUndefined } from '@/types';
import { tp } from '@/typograf';

const IndexPage = ({ h1, clusters }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <DefaultLayout>
            <main data-barba="container" data-barba-namespace="home">
                <section className="section first-section">
                    <h1 className="page-title home-title">{h1}</h1>
                    <ul className="cluster-list js-cluster-list">
                        {clusters.map((cluster, index) => (
                            <li className={`cluster-item ${cluster.className || ''}`} key={index}>
                                {cluster.className === 'contacts-card' ? (
                                    <>
                                        <div className="logo-wrapper">
                                            <img className="logo" src={cluster.logo} alt="" />
                                        </div>
                                        <div className="logo-wrapper">
                                            <img className="logo" src={cluster.logo} alt="" />
                                        </div>
                                    </>
                                ) : (
                                    cluster.logo && (
                                        <div className="logo-wrapper">
                                            <img className="logo" src={cluster.logo} alt="" />
                                        </div>
                                    )
                                )}
                                <h2 className="cluster-title">{cluster.title}</h2>
                                <div className="cluster-description">{tp(cluster.description)}</div>
                                {cluster.contacts && (
                                    <div className="contacts-items">
                                        {cluster.contacts.map((contact, contactIndex) => (
                                            <div className="contacts-item" key={contactIndex}>
                                                <Link
                                                    className="contacts-link btn-underline btn-underline--border"
                                                    href={contact.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer nofollow"
                                                >
                                                    {contact.icon === 'TelSVG' && <TelSVG />}
                                                    {contact.icon === 'InstaSVG' && <InstaSVG />}
                                                    {contact.icon === 'VkSVG' && <VkSVG />}
                                                    {contact.icon === 'TgSVG' && <TgSVG />}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </DefaultLayout>
    );
};

export default IndexPage;

type IndexPageProps = NonUndefined<
    CommonPageProps & {
        h1: string;
        clusters: {
            logo?: string;
            title: string;
            description: string;
            className?: string;
            contacts?: {
                href: string;
                icon: string;
            }[];
        }[];
    }
>;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const commonPageProps = await getCommonPageProps();

    return {
        props: {
            ...commonPageProps,
            bodyClass: 'index-page',
            meta: {
                ...commonPageProps.meta,
                title: 'Главная',
            },
            h1: 'DUNGEON ROOM',
            clusters: [
                {
                    logo: '/images/dice.png',
                    title: 'Приветствую, друг!',
                    description:
                        'Добро пожаловать в волшебный мир настольных ролевых игр, где каждая история погружает вас в бесконечные приключения и незабываемые встречи. В мире, где каждый ваш выбор влияет на судьбу, а ваша смекалка и храбрость определяют исход битвы. Готовы ли вы стать героем своей собственной легенды?',
                },
                {
                    logo: '/images/dice.png',
                    title: 'Погрузитесь в Мир Настольных Ролевых Игр',
                    description:
                        'Настольные ролевые игры (НРИ) — это игры, в которых вы воплощаете в жизнь уникального персонажа и отправляетесь в захватывающее путешествие по миру, созданному вашим воображением и мастером игры. Вместе с другими игроками вы будете исследовать таинственные места, сражаться с мифическими существами и разгадывать загадки, используя систему правил, которая помогает направлять историю и развитие вашего персонажа.',
                },
                {
                    logo: '/images/dice.png',
                    title: 'Познакомьтесь с Нашим Мастером Подземелий',
                    description:
                        'За каждым захватывающим приключением стоит талантливый мастер подземелий. Наш мастер, Тимур, имеет более 10 лет опыта в проведении НРИ и известен своей способностью оживлять фэнтезийные миры с непревзойденным вниманием к деталям. От древних руин до забытых королевств, Мастер Тимур не просто рассказывает истории, он создает атмосферу миров, в которых каждый игрок оставляет свой след.',
                },
                {
                    className: 'contacts-card',
                    logo: '/images/dice.png',
                    title: 'Контакты',
                    description: '',
                    contacts: [
                        { href: 'tel:+79607534273', icon: 'TelSVG' },
                        {
                            href: 'https://www.instagram.com/dungeon_room',
                            icon: 'InstaSVG',
                        },
                        {
                            href: 'https://vk.com/dungeonroom',
                            icon: 'VkSVG',
                        },
                        {
                            href: 'https://t.me/dungeonroom',
                            icon: 'TgSVG',
                        },
                    ],
                },
            ],
        } satisfies IndexPageProps,
    };
};

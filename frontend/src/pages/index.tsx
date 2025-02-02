import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getCommonPageProps } from '@/api/common';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { CommonPageProps, NonUndefined } from '@/types';
import { tp } from '@/typograf';

const IndexPage = ({ h1, clusters, mainPageLogo }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <DefaultLayout>
            <main className="main-container">
                <section className="section first-section">
                    <img className="main-page-logo" src={mainPageLogo} alt="" />
                    <h1 className="page-title home-title">{h1}</h1>
                    <ul className="cluster-list js-cluster-list">
                        {clusters.map((cluster, index) => (
                            <li className={`cluster-item ${cluster.className || ''}`} key={index}>
                                <h2 className="cluster-title">{cluster.title}</h2>
                                <div className="cluster-description">{tp(cluster.description)}</div>
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
        mainPageLogo: string;
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
            mainPageLogo: '/images/dice.png',
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
            ],
        } satisfies IndexPageProps,
    };
};

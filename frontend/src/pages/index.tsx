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
                                <div
                                    className="cluster-description"
                                    dangerouslySetInnerHTML={{
                                        __html: `${tp(cluster.description)}`,
                                    }}
                                ></div>
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
                    title: 'Добро пожаловать, друг!',
                    description: `Dungeon Room -- первое пространство Настольно-ролевых игр (НРИ) в Красноярске! 

НРИ — уникальное развлечение, где вы сами становитесь героями в фантастических мирах, проживаете приключения, решаете загадки и сами создаете свою историю, под чутким руководством игромастера, сидя за игровым столом! Один из ключевых элементов НРИ - использование многогранных кубов (дайсов) для определения исхода действий. 

Dungeon Room — волшебное пространство, которое перенесет вас в прошлое, будущее и в другие вымышленные миры! Вас ждут подземелья, древние гробницы, схватки с драконами, космические корабли, кровожадные монстры и множество других захватывающих приключений!`,
                },
                {
                    logo: '/images/dice.png',
                    title: 'Как попасть к нам?',
                    description: `Ваше приключение начинается задолго до входа в пространство магии и чудес. Сначала нужно: 
                    
- собрать команду путешественников от 2-х до 5-ти человек и выбрать свободный день из календаря;
- определиться с атмосферой и историей, в которые отправитесь (в этом поможет жанровое распределение сюжетов библиотеки Dungeon Room);
-  запастись вкусняшками (у нас не запрещено ничего, кроме алкоголя, ведь он вредит здоровью и воображению!)
- когда все вышеперечисленные данные собраны воедино, можно и нужно писать в <a target="_blank" rel="noopener noreferrer nofollow" class='link-underline is-active' href='https://t.me/dungeonroom'>социальные сети Dungeon Room</a> для бронирования даты и времени!
`,
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

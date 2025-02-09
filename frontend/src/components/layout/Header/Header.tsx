import { useSetPageTransitionState } from '@/atoms/page-transition';
import Link from '@/components/shared/Link';
import InstaSVG from '@/svg/insta.svg';
import TgSVG from '@/svg/tg.svg';

interface Props {
    bodyClass: string;
}

const contacts = [
    {
        href: 'https://www.instagram.com/dungeon_room',
        icon: 'InstaSVG',
    },
    {
        href: 'https://t.me/dungeonroom',
        icon: 'TgSVG',
    },
];

const Header = ({ bodyClass }: Props) => {
    const setLeaveTransition = useSetPageTransitionState();

    return (
        <header className="header">
            <nav className="navbar">
                <img className="header-logo" src="/images/logo.png" alt="" />
                <div className="contacts-socials">
                    {contacts.map((contact, i) => (
                        <div className="contacts-item" key={i}>
                            <Link
                                className="contacts-link btn-underline btn-underline--border"
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                            >
                                {contact.icon === 'InstaSVG' && <InstaSVG />}
                                {contact.icon === 'TgSVG' && <TgSVG />}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="nav-items">
                    <Link
                        href="/calendar"
                        data-to="calendar"
                        className="nav-item link-underline"
                        onClick={() => {
                            if (bodyClass !== 'calendar-page') {
                                setLeaveTransition({
                                    mode: 'wait',
                                    name: 'fromLeftToRight',
                                });
                            }
                        }}
                    >
                        Календарь
                    </Link>
                    <Link
                        href="/"
                        data-to="stories"
                        className="nav-item link-underline"
                        onClick={() => {
                            if (bodyClass !== 'index-page') {
                                if (bodyClass === 'stories-page') {
                                    setLeaveTransition({
                                        mode: 'wait',
                                        name: 'fromLeftToRight',
                                    });
                                } else if (bodyClass === 'calendar-page') {
                                    setLeaveTransition({
                                        mode: 'wait',
                                        name: 'fromRightToLeft',
                                    });
                                }
                            }
                        }}
                    >
                        Главная
                    </Link>
                    <Link
                        href="/stories"
                        data-to="stories"
                        className="nav-item link-underline"
                        onClick={() => {
                            if (bodyClass !== 'stories-page') {
                                setLeaveTransition({
                                    mode: 'wait',
                                    name: 'fromRightToLeft',
                                });
                            }
                        }}
                    >
                        Сюжеты
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;

import { useSetPageTransitionState } from '@/atoms/page-transition';
import Link from '@/components/shared/Link';

interface Props {
    bodyClass: string;
}

const Header = ({ bodyClass }: Props) => {
    const setLeaveTransition = useSetPageTransitionState();

    return (
        <header className="header">
            <nav className="navbar">
                <Link
                    href="/calendar"
                    data-to="calendar"
                    className="nav-item"
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
                    className="nav-item"
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
                    className="nav-item"
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
            </nav>
        </header>
    );
};

export default Header;

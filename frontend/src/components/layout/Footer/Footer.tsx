import Link from '@/components/shared/Link';
import InstaSVG from '@/svg/insta.svg';
import TgSVG from '@/svg/tg.svg';

const footerData = {
    logo: '/images/logo.png',
    phone: {
        href: 'tel:+79607534273',
        text: '+7 (960) 753 - 42 - 73',
    },
    hours: 'Ежедневно с 12:00 до 24:00',
    address: {
        href: 'https://2gis.ru/krasnoyarsk/firm/70000001096838118?m=92.880382%2C56.015821%2F16',
        text: '​Улица Парижской Коммуны, 33',
    },
    socials: [
        {
            href: 'https://www.instagram.com/dungeon_room',
            text: 'Инстаграм',
        },
        {
            href: 'https://t.me/dungeonroom',
            text: 'Телеграм',
        },
    ],
};

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

const Footer = () => {
    return (
        <footer className="cluster-item contacts-card">
            <div className="contacts-content">
                <img className="contacts-logo" src={footerData.logo} alt="" />
                <div className="contacts-info">
                    <Link
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        href={footerData.phone.href}
                        className="contacts-tel link-underline"
                    >
                        {footerData.phone.text}
                    </Link>
                    <div className="contacts-hours">{footerData.hours}</div>
                </div>
                <Link
                    href={footerData.address.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="link-underline contacts-address"
                >
                    {footerData.address.text}
                </Link>
                <div className="contacts-socials">
                    {contacts.map((contact) => (
                        <div className="contacts-item">
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
            </div>
        </footer>
    );
};

export default Footer;

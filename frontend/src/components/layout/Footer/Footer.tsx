import Link from '@/components/shared/Link';

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
                    {footerData.socials.map((social, index) => (
                        <Link
                            key={index}
                            href={social.href}
                            className="link-underline"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                        >
                            {social.text}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

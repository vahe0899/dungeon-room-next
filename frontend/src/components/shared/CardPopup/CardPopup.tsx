import { useSetOpenedPopupsState } from '@/atoms/opened-popups';
import CloseSVG from '@/svg/cross.svg';
import { Story } from '@/types';
import Popup from '../Popup';

interface Props {
    activeStory?: Story;
}

export const CARD_POPUP_NAME = 'card-popup';

const CardPopup = ({ activeStory }: Props) => {
    const { closePopup } = useSetOpenedPopupsState();

    return (
        <Popup name={CARD_POPUP_NAME} data-popup-preset="default" className="card-popup" overlay={true}>
            {activeStory && (
                <div className="card-popup">
                    <button className="card-popup-close-btn" onClick={() => closePopup(CARD_POPUP_NAME)}>
                        <CloseSVG />
                    </button>
                    <div className="card-popup-left">
                        <img className="card-popup-img" src={activeStory.imgSrc} alt={activeStory.frontTitle} />
                    </div>
                    <div className="card-popup-right">
                        <div
                            className="card-popup-title"
                            dangerouslySetInnerHTML={{
                                __html: `${activeStory.frontTitle}`,
                            }}
                        ></div>
                        <div
                            className="card-popup-text"
                            dangerouslySetInnerHTML={{
                                __html: `${activeStory.backText}`,
                            }}
                        ></div>
                        <div className="card-popup-content card-popup-text">Жанр : {activeStory.genre}</div>
                        <div className="card-popup-text">Количество игроков : {activeStory.playersCount}</div>
                        <div className="card-popup-text">Сложность : {activeStory.difficult}</div>
                        <div className="card-popup-text">Продолжительность : {activeStory.duration}</div>
                        <div className="card-popup-text">Сеттинг : {activeStory.setting}</div>
                        <div className="card-popup-text">Свобода мира : {activeStory.worldFreedom}</div>
                        <div className="card-popup-text">Тема : {activeStory.theme}</div>
                        <div className="card-popup-text">Система игры : {activeStory.gameSystem}</div>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CardPopup;

import { useSetOpenedPopupsState } from '@/atoms/opened-popups';
import Popup from '../Popup';

interface Props {
    url?: string;
}

export const CARD_POPUP_NAME = 'card-popup';

const CardPopup = ({ url }: Props) => {
    const { closePopup } = useSetOpenedPopupsState();

    return (
        <Popup name={CARD_POPUP_NAME} data-popup-preset="default" className="card-popup" overlay={true}>
            <div className="card-popup">
                <button className="card-popup-close-btn" onClick={() => closePopup(CARD_POPUP_NAME)}>
                    {/* <CloseSVG /> */}
                </button>
            </div>
        </Popup>
    );
};

export default CardPopup;

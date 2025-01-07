import { animate } from 'framer-motion';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/dom';
import { easeInOutCubic } from '@/utils/easings';
import { timeout } from '@/utils/timeout';

export const leaveFromLeftToRight = ({
    setOpenedPopups,
}: {
    targetElement?: Element | null;
    setOpenedPopups?: (popups: string[]) => void;
}): Promise<void> =>
    new Promise((resolve) => {
        const whiteBg = document.querySelector<HTMLElement>('.js-transition-white-bg-left');

        lockBodyScroll();
        if (whiteBg) {
            if (setOpenedPopups) {
                setOpenedPopups([]);
            }
            animate(0, 1, {
                duration: 0.6,
                delay: 0.2,
                ease: easeInOutCubic,
                onUpdate: (val) => {
                    whiteBg.style.transform = `scaleX(${val})`;
                },
                onComplete: async () => {
                    whiteBg.style.transformOrigin = 'right';
                    whiteBg.style.left = 'unset';
                    whiteBg.style.right = '0';
                    unlockBodyScroll();
                    resolve();
                    await timeout(100);
                    animate(1, 0, {
                        duration: 0.6,
                        ease: easeInOutCubic,
                        onUpdate: (val) => {
                            whiteBg.style.transform = `scaleX(${val})`;
                        },
                        onComplete: () => {
                            whiteBg.style.transformOrigin = 'left';
                            whiteBg.style.transform = ``;
                            whiteBg.style.left = '0';
                            whiteBg.style.right = 'unset';
                        },
                    });
                },
            });
        } else {
            unlockBodyScroll();
            resolve();
        }
    });

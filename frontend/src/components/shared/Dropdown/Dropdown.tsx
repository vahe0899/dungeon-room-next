import classNames from 'classnames';
import { AnimationProps, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ButtonHTMLAttributes, Dispatch, HTMLAttributes, SetStateAction, createContext, useContext } from 'react';
import { useOnOutsideClickAction } from '@/hooks/use-on-outside-click-action';
import { easeOutQuart } from '@/utils/easings';
import { Props as ButtonProps } from '../Button/Button';

interface Props extends HTMLAttributes<HTMLElement> {}

const DropdownContext = createContext<{ opened: boolean; setOpened: Dispatch<SetStateAction<boolean>> }>({
    opened: false,
    setOpened: () => {},
});

export const useDropdownContext = () => useContext(DropdownContext);

type TogglerProps = ButtonHTMLAttributes<HTMLButtonElement> &
    Partial<ButtonProps> & {
        keepOpen?: boolean;
    };

const Toggler = ({ tag = 'button', ...props }: TogglerProps) => {
    const { opened, setOpened } = useContext(DropdownContext);
    const Component = tag as any;

    return (
        <Component
            {...props}
            className={classNames('dropdown-btn', props.className)}
            onClick={(event: any) => {
                setOpened(!opened);
                props.onClick?.(event);
            }}
            aria-haspopup="true"
        ></Component>
    );
};

const Picker = ({ tag = 'button', keepOpen, ...props }: TogglerProps) => {
    const { setOpened } = useContext(DropdownContext);
    const Component = tag as any;

    return (
        <Component
            {...props}
            type={tag === 'button' ? 'button' : undefined}
            className={classNames('dropdown-picker-btn', props.className)}
            onClick={(event: any) => {
                if (!keepOpen) setOpened(false);
                props.onClick?.(event);
            }}
        ></Component>
    );
};

const Content = ({
    children,
    position = 'bottom-left',
    ...props
}: HTMLAttributes<HTMLElement> & {
    position?: 'bottom-left' | 'bottom-right';
}) => {
    const { opened } = useDropdownContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        if (contentRef.current) {
            const dropdownRect = contentRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Если контент выходит за правый край, меняем позицию на bottom-right
            if (dropdownRect.right > viewportWidth) {
                setAdjustedPosition('bottom-right');
            } else {
                setAdjustedPosition('bottom-left');
            }
        }
    }, [position]);

    return (
        <motion.div
            {...(props as AnimationProps)}
            ref={contentRef}
            variants={{
                hidden: {
                    pointerEvents: 'none',
                    opacity: 0,
                    y: -7,
                    transition: { duration: 0.3, ease: easeOutQuart },
                },
                visible: {
                    pointerEvents: 'auto',
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: easeOutQuart },
                },
            }}
            initial={false}
            animate={opened ? 'visible' : 'hidden'}
            className={classNames('dropdown-content', props.className, adjustedPosition)}
        >
            <div className="dropdown-content-inner">{children}</div>
        </motion.div>
    );
};

const Dropdown = ({ id, children, ...props }: Props) => {
    const [opened, setOpened] = useState(false);
    useOnOutsideClickAction(`.js-dropdown-${id}`, () => setOpened(false));

    return (
        <DropdownContext.Provider value={{ opened, setOpened }}>
            <div
                {...props}
                className={classNames(`dropdown js-dropdown-${id}`, props.className, { 'dropdown--opened': opened })}
            >
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

Dropdown.Toggler = Toggler;
Dropdown.Content = Content;
Dropdown.Picker = Picker;

export default Dropdown;

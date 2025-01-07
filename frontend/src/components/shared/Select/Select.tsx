import classNames from 'classnames';
import { ButtonHTMLAttributes, CSSProperties, ReactNode, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useResizeObserver } from 'usehooks-ts';
import Dropdown from '../Dropdown';
import { useDropdownContext } from '../Dropdown/Dropdown';

type Props = React.HTMLAttributes<HTMLElement> & {
    name?: string;
    label: string;
    options: { text: string; value: string }[];
    value?: string;
    initialValue?: string;
    valid?: boolean;
    onPick?: (value: string) => void;
    showMessage?: boolean;
    message?: string;
    icon?: ReactNode;
    required?: boolean;
};

const SelectPicker = ({
    isActive = false,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) => {
    const { setOpened } = useDropdownContext();

    return (
        <button
            {...props}
            type="button"
            className={classNames('select-option', props.className, { 'is-active': isActive })}
            onClick={(event) => {
                setOpened(false);
                props.onClick?.(event);
            }}
        >
            {children}
        </button>
    );
};

const Select = ({
    id,
    name,
    label,
    options,
    value,
    valid = true,
    initialValue = '',
    onPick,
    showMessage = true,
    message,
    icon,
    required,
    ...props
}: Props) => {
    const contentElRef = useRef<HTMLDivElement>(null);
    const messageElRef = useRef<HTMLDivElement>(null);
    const [innerValue, setInnerValue] = useState(initialValue ?? value);
    const selectedText = options.find((option) => option.value === innerValue)?.text ?? '';
    const labelEl = useRef<HTMLLabelElement>(null);
    const { height: labelElHeight } = useResizeObserver({ ref: labelEl });
    const [contentHeight, setContentHeight] = useState(0);
    const messageSize = useResizeObserver({ ref: messageElRef, box: 'border-box' });

    useIsomorphicLayoutEffect(() => {
        const onResize = () => {
            if (contentElRef.current) {
                setContentHeight(contentElRef.current.offsetHeight);
            }
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <Dropdown {...props} className={classNames('select', props.className)}>
            {name && <input id={id} type="hidden" name={name} required={required} value={innerValue} />}
            <div
                className={classNames('input-group floated-labels--active select-toggler-wrapper', {
                    'is-error': !valid,
                })}
                style={
                    {
                        '--label-height': `${labelElHeight}px`,
                        '--content-height': `${contentHeight + (messageSize.height ?? 0)}px`,
                    } as CSSProperties
                }
            >
                <div className="select-bg form-control"></div>
                <Dropdown.Toggler className="form-control floated-labels floated-labels--active select-toggler">
                    <span className="select-toggler-inner">{selectedText}</span>
                </Dropdown.Toggler>
                <label ref={labelEl} htmlFor={id} className="form-label text-s">
                    {label}
                </label>
                {icon && <div className="input-group__icon">{icon}</div>}
                {showMessage && (
                    <div ref={messageElRef} className="app-message text-xs" aria-live="polite" aria-describedby={id}>
                        {message || ''}
                    </div>
                )}
            </div>
            <Dropdown.Content ref={contentElRef}>
                <ul className="list-unstyled select-options-list input-group">
                    {options.map((option, i) => (
                        <li key={i} className="select-options-list__item">
                            <SelectPicker
                                onClick={() => {
                                    setInnerValue(option.value);
                                    onPick?.(option.value);
                                }}
                                isActive={option.value === innerValue}
                            >
                                {option.text}
                            </SelectPicker>
                        </li>
                    ))}
                </ul>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default Select;

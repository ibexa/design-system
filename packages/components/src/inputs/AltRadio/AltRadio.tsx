import React, { useRef, useState } from 'react';

import BaseChoiceInput from '@ids-internal/partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { AltRadioProps } from './AltRadio.types';

const AltRadio = ({ className = '', label, ...restProps }: AltRadioProps) => {
    const { checked = false, disabled = false, error = false, onBlur, onChange, onFocus, onInput } = restProps;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const altRadioClassName = createCssClassNames({
        'ids-alt-radio': true,
        [className]: true,
    });
    const altRadioTileClassName = createCssClassNames({
        'ids-alt-radio__tile': true,
        'ids-alt-radio__tile--checked': checked,
        'ids-alt-radio__tile--disabled': disabled,
        'ids-alt-radio__tile--error': error,
        'ids-alt-radio__tile--focused': isFocused,
    });
    const onTileClick = () => {
        inputRef.current?.focus();

        if (!checked) {
            onChange?.(true);
            onInput?.(true);
        }
    };
    const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(event);
    };
    const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(event);
    };

    return (
        <div className={altRadioClassName}>
            <div className="ids-alt-radio__source">
                <BaseChoiceInput {...restProps} onBlur={onInputBlur} onFocus={onInputFocus} ref={inputRef} type="radio" />
            </div>
            <div className={altRadioTileClassName} onClick={onTileClick} role="button">
                {label}
            </div>
        </div>
    );
};

export default AltRadio;

export const AltRadioStateful = withStateChecked(AltRadio);

import React, { useRef, useState } from 'react';

import BaseChoiceInput from '@ids-internal/partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { AltRadioProps } from './AltRadio.types';

const AltRadio = ({ className = '', label, tileClassName = '', title = '', ...inputProps }: AltRadioProps) => {
    const { checked = false, disabled = false, error = false, onBlur, onChange, onFocus, onInput } = inputProps;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const altRadioClassName = createCssClassNames({
        'ids-alt-radio': true,
        [className]: !!className,
    });
    const altRadioTileClassName = createCssClassNames({
        'ids-alt-radio__tile': true,
        'ids-alt-radio__tile--checked': checked,
        'ids-alt-radio__tile--disabled': disabled,
        'ids-alt-radio__tile--error': error,
        'ids-alt-radio__tile--focused': isFocused,
        [tileClassName]: !!tileClassName,
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
        <div className={altRadioClassName} title={title}>
            <div className="ids-alt-radio__source">
                <BaseChoiceInput
                    {...inputProps}
                    onBlur={onInputBlur}
                    onFocus={onInputFocus}
                    ref={(node) => {
                        inputRef.current = node;

                        if (typeof inputProps.ref === 'function') {
                            inputProps.ref(node);
                        } else if (inputProps.ref) {
                            inputProps.ref.current = node; // eslint-disable-line no-param-reassign
                        }
                    }}
                    type="radio"
                />
            </div>
            <div className={altRadioTileClassName} onClick={onTileClick} role="button">
                {label}
            </div>
        </div>
    );
};

export default AltRadio;

export const AltRadioStateful = withStateChecked<AltRadioProps>(AltRadio);

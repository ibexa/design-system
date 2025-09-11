import React, { useContext, useRef, useState } from 'react';

import BaseChoiceInput from '@ids-internal/partials/BaseChoiceInput';
import ChoiceInputLabel from '../../ChoiceInputLabel';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import { useGetOrCreateId } from '@ids-internal/hooks/generators';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { ToggleProps, ToggleSize } from './Toggle.types';

const Toggle = ({ className = '', disabledLabel, enabledLabel, size = ToggleSize.Medium, title = '', ...inputProps }: ToggleProps) => {
    const { checked = false, disabled = false, id, onBlur, onChange, onFocus, onInput } = inputProps;
    const Translator = useContext(TranslatorContext);
    const componentId = useGetOrCreateId({ id, prefix: 'ids-toggle' });
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const toggleClassName = createCssClassNames({
        'ids-toggle': true,
        [`ids-toggle--${size}`]: true,
        'ids-toggle--checked': checked,
        'ids-toggle--disabled': disabled,
        'ids-toggle--focused': isFocused,
        [className]: !!className,
    });
    const onTogglerClick = () => {
        inputRef.current?.focus();

        onChange?.(!checked);
        onInput?.(!checked);
    };
    const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(event);
    };
    const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(event);
    };
    const getLabel = () => {
        const defaultEnabledLabel = Translator.trans(/*@Desc("Yes")*/ 'ids.toggle.label.enabled');
        const defaultDisabledLabel = Translator.trans(/*@Desc("No")*/ 'ids.toggle.label.disabled');

        if (checked) {
            return enabledLabel ?? defaultEnabledLabel;
        }

        return disabledLabel ?? defaultDisabledLabel;
    };

    return (
        <div className={toggleClassName} title={title}>
            <div className="ids-toggle__source">
                <BaseChoiceInput
                    {...inputProps}
                    id={componentId}
                    onBlur={onInputBlur}
                    onChange={(state) => onChange?.(state)}
                    onFocus={onInputFocus}
                    onInput={(state) => onInput?.(state)}
                    ref={(node) => {
                        inputRef.current = node;

                        if (typeof inputProps.ref === 'function') {
                            inputProps.ref(node);
                        } else if (inputProps.ref) {
                            inputProps.ref.current = node; // eslint-disable-line no-param-reassign
                        }
                    }}
                    type="checkbox"
                />
            </div>
            <div className="ids-toggle__widget" onClick={onTogglerClick} role="button">
                <div className="ids-toggle__indicator" />
            </div>
            <ChoiceInputLabel className="ids-toggle__label" htmlFor={componentId} title={title}>
                {getLabel()}
            </ChoiceInputLabel>
        </div>
    );
};

export default Toggle;

export const ToggleStateful = withStateChecked<ToggleProps>(Toggle);

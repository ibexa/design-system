import React, { useContext, useRef, useState } from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { ChoiceInputLabel } from '@ids-components/ChoiceInputLabel';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ids-core';
import { useGetOrCreateId } from '@ids-hooks/generators';
import { withStateChecked } from '@ids-hoc/withStateChecked';

import { ToggleButtonInputProps, ToggleButtonInputSize } from './ToggleButtonInput.types';

export const ToggleButtonInput = ({
    className = '',
    disabledLabel,
    enabledLabel,
    size = ToggleButtonInputSize.Medium,
    title = '',
    ...inputProps
}: ToggleButtonInputProps) => {
    const {
        checked = false,
        disabled = false,
        id,
        onBlur = () => undefined,
        onChange = () => undefined,
        onFocus = () => undefined,
        onInput = () => undefined,
    } = inputProps;
    const Translator = useContext(TranslatorContext);
    const componentId = useGetOrCreateId(id);
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

        onChange(!checked);
        onInput(!checked);
    };
    const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus(event);
    };
    const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur(event);
    };
    const getLabel = () => {
        const defaultEnabledLabel = Translator.trans(/*@Desc("On")*/ 'ids.toggle.label.enabled');
        const defaultDisabledLabel = Translator.trans(/*@Desc("Off")*/ 'ids.toggle.label.disabled');

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
                    onChange={onChange}
                    onFocus={onInputFocus}
                    onInput={onInput}
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

export const ToggleButtonInputStateful = withStateChecked<ToggleButtonInputProps>(ToggleButtonInput);

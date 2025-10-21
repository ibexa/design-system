import React, { useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { BaseInput } from '@ids-partials/BaseInput';
import { ClearBtn } from '../../../ui/ClearBtn';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import withStateValue from '@ids-hoc/withStateValue';

import { InputTextInputProps, InputTextInputSize } from './InputTextInput.types';
import { ComponentEntryDataType } from '@ids-types/general';

export const InputTextInput = ({
    name,
    onBlur = () => undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onInput = () => undefined,
    disabled = false,
    error = false,
    extraAria = {},
    className = '',
    id = undefined,
    placeholder = '',
    processActions = (actions): ComponentEntryDataType[] => actions,
    readOnly = false,
    ref = null,
    required = false,
    size = InputTextInputSize.Medium,
    title = '',
    type = 'text',
    value = '',
}: InputTextInputProps) => {
    const actionsRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [sourcePadding, setSourcePadding] = useState(0);
    const inputTextClassName = createCssClassNames({
        'ids-input-text': true,
        [className]: true,
    });
    const componentOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
    };
    const componentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event);
    };
    const componentOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus(event);
    };
    const componentOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInput(event.target.value, event);
    };
    const actions = useMemo((): ComponentEntryDataType[] => {
        const baseActions: ComponentEntryDataType[] = [];

        if (value) {
            baseActions.push({
                component: (
                    <ClearBtn
                        disabled={disabled}
                        onClick={() => {
                            onChange('');
                        }}
                    />
                ),
                id: 'clear',
            });
        }

        return processActions(baseActions);
    }, [disabled, onChange, processActions, value]);
    const renderActions = () => {
        if (actions.length === 0) {
            return null;
        }

        return (
            <div className="ids-input-text__actions" ref={actionsRef}>
                {actions.map((action) => (
                    <div className="ids-input-text__action" key={action.id}>
                        {action.component}
                    </div>
                ))}
            </div>
        );
    };

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
    }));

    useLayoutEffect(() => {
        const actionsWidth = actionsRef.current?.offsetWidth ?? 0;

        setSourcePadding(actionsWidth);
    }, [value]);

    return (
        <div className={inputTextClassName}>
            <div className="ids-input-text__source">
                <BaseInput
                    disabled={disabled}
                    error={error}
                    extraInputAttrs={{
                        onBlur: componentOnBlur,
                        onChange: componentOnChange,
                        onFocus: componentOnFocus,
                        onInput: componentOnInput,
                        placeholder,
                        readOnly,
                        style: { paddingRight: `${sourcePadding}px` },
                        ...extraAria,
                    }}
                    id={id}
                    name={name}
                    ref={inputRef}
                    required={required}
                    size={size}
                    title={title}
                    type={type}
                    value={value}
                />
            </div>
            {renderActions()}
        </div>
    );
};

export const InputTextInputStateful = withStateValue<InputTextInputProps, string | number>(InputTextInput);

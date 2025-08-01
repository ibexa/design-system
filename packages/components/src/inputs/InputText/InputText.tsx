import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import BaseInput from '@ids-internal/partials/BaseInput';
import ClearBtn from '../../ui/ClearBtn';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { ComponentEntryDataType } from '@ids-types/general';
import { InputTextProps } from './InputText.types';

const Input = ({
    name,
    onBlur = () => undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onInput = () => undefined,
    disabled = false,
    error = false,
    extraAria = {},
    extraClasses = '',
    id = undefined,
    placeholder = '',
    processActions = (actions): ComponentEntryDataType[] => actions,
    readOnly = false,
    required = false,
    size = 'medium',
    title = '',
    type = 'text',
    value = '',
}: InputTextProps) => {
    const actionsRef = useRef<HTMLDivElement>(null);
    const [sourcePadding, setSourcePadding] = useState(0);
    const inputTextClassName = createCssClassNames({
        'ids-input-text': true,
        [extraClasses]: true,
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
                        style: { paddingRight: `${sourcePadding.toString()}px` },
                        ...extraAria,
                    }}
                    id={id}
                    name={name}
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

export default Input;

import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { BaseInput } from '@ids-partials/BaseInput';
import { ClearBtn } from '../../../ui/ClearBtn';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ids-core';
import { withStateValue } from '@ids-hoc/withStateValue';

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
    hasSearchAction = false,
    className = '',
    id,
    placeholder = '',
    processActions = (actions): ComponentEntryDataType[] => actions,
    readOnly = false,
    ref = null,
    required = false,
    searchButtonType = 'submit',
    size = InputTextInputSize.Medium,
    title = '',
    type = 'text',
    value = '',
}: InputTextInputProps) => {
    const Translator = useContext(TranslatorContext);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [sourcePadding, setSourcePadding] = useState(0);
    const [resolvedType, setResolvedType] = useState(type);
    const inputTextClassName = createCssClassNames({
        'ids-input-text': true,
        [className]: true,
    });
    const showPasswordToggle = type === 'password' && !hasSearchAction;
    const showSearchAction = hasSearchAction && type !== 'password';
    const searchMsg = Translator.trans(/*@Desc("Search")*/ 'ids.search-button.label');
    const passwordVisibilityMsg = Translator.trans(/*@Desc("Toggle password visibility")*/ 'ids.show-password.label');
    const componentOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
    };
    const componentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event);
    };
    const componentOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus(event);
    };
    const componentOnInput = (event: React.InputEvent<HTMLInputElement>) => {
        onInput(event);
    };
    const handleClear = () => {
        onChange('');
    };
    const handlePasswordToggle = () => {
        setResolvedType((currentType) => (currentType === 'password' ? 'text' : 'password'));
    };
    const renderPasswordToggle = (isPasswordVisible: boolean) => (
        <button
            aria-label={passwordVisibilityMsg}
            className="ids-btn ids-btn--tertiary-alt ids-btn--small ids-btn--icon-only ids-input-text__password-toggler"
            disabled={disabled}
            onClick={handlePasswordToggle}
            title={passwordVisibilityMsg}
            type="button"
        >
            <span className="ids-btn__icon">
                <span
                    className={createCssClassNames({
                        'ids-input-text__password-icon': true,
                        'ids-input-text__password-icon--show': true,
                    })}
                    hidden={isPasswordVisible}
                >
                    <Icon name="visibility" size={IconSize.TinySmall} />
                </span>
                <span
                    className={createCssClassNames({
                        'ids-input-text__password-icon': true,
                        'ids-input-text__password-icon--hide': true,
                    })}
                    hidden={!isPasswordVisible}
                >
                    <Icon name="visibility-hidden" size={IconSize.TinySmall} />
                </span>
            </span>
        </button>
    );
    const renderSearchAction = () => (
        <button
            aria-label={searchMsg}
            className="ids-btn ids-btn--tertiary-alt ids-btn--small ids-btn--icon-only ids-input-text__search-btn"
            disabled={disabled}
            title={searchMsg}
            type={searchButtonType}
        >
            <span className="ids-btn__icon">
                <Icon name="search" size={IconSize.TinySmall} />
            </span>
        </button>
    );
    const actions = ((): ComponentEntryDataType[] => {
        const baseActions: ComponentEntryDataType[] = [];

        if (value) {
            baseActions.push({
                component: <ClearBtn disabled={disabled} onClick={handleClear} />,
                id: 'clear',
            });
        }

        if (showPasswordToggle) {
            const isPasswordVisible = resolvedType !== 'password';

            baseActions.push({
                component: renderPasswordToggle(isPasswordVisible),
                id: 'password-toggle',
            });
        }

        if (showSearchAction) {
            baseActions.push({
                component: renderSearchAction(),
                id: 'search',
            });
        }

        return processActions(baseActions);
    })();
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
    }, [actions, value]);

    useEffect(() => {
        setResolvedType(type);
    }, [type]);

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
                    ref={ref}
                    required={required}
                    size={size}
                    title={title}
                    type={resolvedType}
                    value={value}
                />
            </div>
            {renderActions()}
        </div>
    );
};

export const InputTextInputStateful = withStateValue<InputTextInputProps, string | number>(InputTextInput);

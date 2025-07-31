import React, { useEffect } from 'react';

import BaseFormControl from '@ids-internal/partials/BaseFormControl';
import InputText from '../../inputs/InputText';
import IsEmptyStringValidator from '../../validators/IsEmptyStringValidator';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import useValidatorManager from '@ids-internal/hooks/useValidatorManager';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { InputTextProps } from './InputText.types';

const FormControlInputText = ({
    helperText,
    helperTextExtra = {},
    input = {},
    label,
    labelExtra = {},
    name,
    onChange = () => undefined,
    onValidate = () => undefined,
    value,
}: InputTextProps) => {
    const validatorManager = useValidatorManager();
    const { isValid, messages } = validatorManager.validate(value);
    const className = createCssClassNames({
        'ids-form-control--input-text': true,
    });
    const helperTextProps = {
        children: isValid ? helperText : messages.join(', '),
        type: isValid ? ('default' as const) : ('error' as const),
        ...helperTextExtra,
    };
    const labelProps = {
        children: label,
        error: !isValid,
        required: input.required,
        ...labelExtra,
    };
    const inputProps = {
        ...input,
        error: !isValid,
        name,
        onChange,
        value,
    };

    useEffect(() => {
        if (input.required) {
            const isEmptyValidator = new IsEmptyStringValidator();

            validatorManager.addValidator(isEmptyValidator);

            return () => {
                validatorManager.removeValidator(isEmptyValidator);
            };
        }
    }, [input.required]);

    useEffect(() => {
        onValidate(isValid, messages);
    }, [isValid, messages, onValidate]);

    return (
        <BaseFormControl className={className} helperText={helperTextProps} label={labelProps}>
            <InputText {...inputProps} />
        </BaseFormControl>
    );
};

export default FormControlInputText;

export const InputTextStateful = withStateValue(FormControlInputText);

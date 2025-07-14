import React, { useEffect } from 'react';

import HelperText from '../HelperText';
import InputText from '../inputs/InputText';
import Label from '../Label';

import IsEmptyStringValidator from '../validators/IsEmptyStringValidator';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import { useGenerateSimpleNumberId } from '@ids-internal/hooks/generators';
import useValidatorManager from '@ids-internal/hooks/useValidatorManager';
import withStateInput from './withStateInput';

import { FormControlProps } from './FormControl.types';

const FORM_CONTROL_ID_PREFIX = 'ids-form-control-';

const FormControl = ({ extraClasses = '', helperText, input: inputProps, label, onValidate }: FormControlProps) => {
    const formGeneratedNumberId = useGenerateSimpleNumberId();
    const validatorManager = useValidatorManager();
    const { isValid, messages } = validatorManager.validate(inputProps.value);
    const formId = inputProps.id ?? `${FORM_CONTROL_ID_PREFIX}${formGeneratedNumberId.toString()}`;
    const { required } = inputProps;
    const classes = createCssClassNames({
        'ids-form-control': true,
        [extraClasses]: true,
    });
    const renderLabel = () => {
        if (!label) {
            return null;
        }

        const { content: labelContent, ...labelProps } = label;

        return (
            <div className="ids-form-control__label-wrapper">
                <Label error={!isValid} htmlFor={formId} required={required} {...labelProps}>
                    {labelContent}
                </Label>
            </div>
        );
    };
    const renderHelperText = () => {
        if (!helperText) {
            return null;
        }

        const { content: helperTextContent, ...helperTextProps } = helperText;

        return (
            <div className="ids-form-control__helper-text-wrapper">
                <HelperText type={isValid ? 'default' : 'error'} {...helperTextProps}>
                    {isValid ? helperTextContent : messages.join(', ')}
                </HelperText>
            </div>
        );
    };

    useEffect(() => {
        if (required) {
            const isEmptyValidator = new IsEmptyStringValidator();

            validatorManager.addValidator(isEmptyValidator);

            return () => {
                validatorManager.removeValidator(isEmptyValidator);
            };
        }
    }, [required]);

    useEffect(() => {
        if (onValidate) {
            onValidate(isValid, messages);
        }
    }, [isValid, messages]);

    return (
        <div className={classes}>
            {renderLabel()}
            <div className="ids-form-control__source-wrapper">
                <InputText error={!isValid} id={formId} {...inputProps} />
            </div>
            {renderHelperText()}
        </div>
    );
};

export default FormControl;

export const FormControlStateful = withStateInput(FormControl);

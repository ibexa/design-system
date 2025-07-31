import React from 'react';

import HelperText from '../../../HelperText';
import Label from '../../../Label';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { BaseFormControlProps } from './BaseFormControl.types';

const BaseFormControl = ({ children, className = '', helperText, label }: BaseFormControlProps) => {
    const classes = createCssClassNames({
        'ids-form-control': true,
        [className]: true,
    });
    const renderLabel = () => {
        if (!label) {
            return null;
        }

        const { children: labelContent, ...labelProps } = label;

        return (
            <div className="ids-form-control__label-wrapper">
                <Label {...labelProps}>
                    {labelContent}
                </Label>
            </div>
        );
    };
    const renderHelperText = () => {
        if (!helperText) {
            return null;
        }

        const { children: helperTextContent, ...helperTextProps } = helperText;

        return (
            <div className="ids-form-control__helper-text-wrapper">
                <HelperText {...helperTextProps}>
                    {helperTextContent}
                </HelperText>
            </div>
        );
    };

    return (
        <div className={classes}>
            {renderLabel()}
            <div className="ids-form-control__source-wrapper">
                {children}
            </div>
            {renderHelperText()}
        </div>
    );
};

export default BaseFormControl;

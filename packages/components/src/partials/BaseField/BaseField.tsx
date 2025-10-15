import React from 'react';

import { HelperText } from '@ids-components/HelperText';
import { Label } from '@ids-components/Label';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { BaseFieldProps } from './BaseField.types';

export const BaseField = ({ children, className = '', helperText, label, type }: BaseFieldProps) => {
    const classes = createCssClassNames({
        'ids-field': true,
        [`ids-field--${type}`]: true,
        [className]: !!className,
    });
    const renderLabel = () => {
        if (!label) {
            return null;
        }

        const { children: labelContent, ...labelProps } = label;

        return (
            <div className="ids-field__label-wrapper">
                <Label {...labelProps}>{labelContent}</Label>
            </div>
        );
    };
    const renderHelperText = () => {
        if (!helperText) {
            return null;
        }

        const { children: helperTextContent, ...helperTextProps } = helperText;

        return (
            <div className="ids-field__helper-text-wrapper">
                <HelperText {...helperTextProps}>{helperTextContent}</HelperText>
            </div>
        );
    };

    return (
        <div className={classes}>
            {renderLabel()}
            <div className="ids-field__source-wrapper">{children}</div>
            {renderHelperText()}
        </div>
    );
};

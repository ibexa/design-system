import React, { FC, useState } from 'react';

import { FormControlProps } from './FormControl.types';

export default (WrappedComponent: FC<FormControlProps>) => {
    const WrapperComponent = ({ input: { value, onChange, ...restInputProps }, ...restProps }: FormControlProps) => {
        const [componentValue, setComponentValue] = useState(value);

        const handleChange = (newValue: string, event?: React.ChangeEvent<HTMLInputElement>) => {
            setComponentValue(newValue);

            if (onChange) {
                onChange(newValue, event);
            }
        };

        return (
            <WrappedComponent
                {...restProps}
                input={{
                    ...restInputProps,
                    onChange: handleChange,
                    value: componentValue,
                }}
            />
        );
    };

    return WrapperComponent;
};

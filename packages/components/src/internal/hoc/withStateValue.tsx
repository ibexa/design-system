import React, { FC, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface WrappedComponentProps {
    onChange?: (value: string, ...restArgs: any[]) => void;
    value: any;
    [key: string]: any;
}

export default (WrappedComponent: FC<any>) => {
    const WrapperComponent = ({ value, onChange, ...restProps }: WrappedComponentProps) => {
        const [componentValue, setComponentValue] = useState(value); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

        const handleChange = (newValue: string, ...restArgs: any[]) => {
            setComponentValue(newValue);

            if (onChange) {
                onChange(newValue, ...restArgs); // eslint-disable-line @typescript-eslint/no-unsafe-argument
            }
        };

        return (
            <WrappedComponent
                {...restProps}
                onChange={handleChange}
                value={componentValue} // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            />
        );
    };

    WrapperComponent.displayName = `withStateValue(${WrappedComponent.displayName ?? WrappedComponent.name})`;

    return WrapperComponent;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

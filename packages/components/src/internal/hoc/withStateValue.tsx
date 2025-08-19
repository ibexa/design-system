import React, { FC, useState } from 'react';

type OnChangeFn<T> = (value: T, ...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
interface WrappedComponentProps<T> {
    onChange?: OnChangeFn<T>;
    value: T;
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default <T,>(WrappedComponent: FC<any>) => {
    const WrapperComponent = ({ value, onChange, ...restProps }: WrappedComponentProps<T>) => {
        const [componentValue, setComponentValue] = useState(value);

        const handleChange = (...args: Parameters<OnChangeFn<T>>): ReturnType<OnChangeFn<T>> => {
            setComponentValue(args[0]);

            if (onChange) {
                onChange(...args);
            }
        };

        return <WrappedComponent {...restProps} onChange={handleChange} value={componentValue} />;
    };

    WrapperComponent.displayName = `withStateValue(${WrappedComponent.displayName ?? WrappedComponent.name})`;

    return WrapperComponent;
};

import React, { FC, useState } from 'react';

type OnChangeFn<T> = (value: T, ...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

interface BaseProps<T> {
    onChange?: OnChangeFn<T>;
    value: T;
}

export type WrappedComponentProps<Props, ValueType> = BaseProps<ValueType> & Props;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default <Props,ValueType>(WrappedComponent: FC<any>) => {
    const WrapperComponent = ({ value, onChange, ...restProps }: WrappedComponentProps<Props, ValueType>) => {
        const [componentValue, setComponentValue] = useState(value);

        const handleChange = (...args: Parameters<OnChangeFn<ValueType>>): ReturnType<OnChangeFn<ValueType>> => {
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

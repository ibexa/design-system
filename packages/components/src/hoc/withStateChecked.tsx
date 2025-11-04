import React, { FC, useEffect, useState } from 'react';

type OnChangeFn = (checked: boolean, ...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

interface BaseProps {
    onChange?: OnChangeFn;
    checked: boolean;
}

export type WithStateCheckedWrappedComponentProps<T extends object> = BaseProps & T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withStateChecked = <T extends object>(WrappedComponent: FC<any>) => {
    const WrapperComponent = ({ checked, onChange, ...restProps }: WithStateCheckedWrappedComponentProps<T>) => {
        const [componentChecked, setComponentChecked] = useState(checked);
        const handleChange = (...args: Parameters<OnChangeFn>): ReturnType<OnChangeFn> => {
            setComponentChecked(args[0]);

            if (onChange) {
                onChange(...args);
            }
        };

        useEffect(() => {
            setComponentChecked(checked);
        }, [checked]);

        return <WrappedComponent {...restProps} checked={componentChecked} onChange={handleChange} />;
    };

    WrapperComponent.displayName = `withStateChecked(${WrappedComponent.displayName ?? WrappedComponent.name})`;

    return WrapperComponent;
};

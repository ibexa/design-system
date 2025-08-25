import React, { FC, useState } from 'react';

type OnChangeFn = (checked: boolean, ...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
interface WrappedComponentProps {
    onChange?: OnChangeFn;
    checked: boolean;
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (WrappedComponent: FC<any>) => {
    const WrapperComponent = ({ checked, onChange, ...restProps }: WrappedComponentProps) => {
        const [componentChecked, setComponentChecked] = useState(checked);

        const handleChange = (...args: Parameters<OnChangeFn>): ReturnType<OnChangeFn> => {
            setComponentChecked(args[0]);

            if (onChange) {
                onChange(...args);
            }
        };

        return <WrappedComponent {...restProps} checked={componentChecked} onChange={handleChange} />;
    };

    WrapperComponent.displayName = `withStateChecked(${WrappedComponent.displayName ?? WrappedComponent.name})`;

    return WrapperComponent;
};

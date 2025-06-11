import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

import { BaseAttributes } from '@ids-types/general';

export const INPUT_TYPE_VALUES = [
    'text',
    'password',
    'email',
    'number',
    'tel',
    'search',
    'url',
    'checkbox',
    'radio',
    'hidden',
] as const satisfies HTMLInputTypeAttribute[];

export type BaseInputTypesType = (typeof INPUT_TYPE_VALUES)[number];

interface BaseInputPropsProps extends Exclude<BaseAttributes, 'extraAria'> {
    name: string;
    disabled?: boolean;
    error?: boolean;
    extraClasses?: string;
    id?: string;
    size?: string;
    value?: string | number;
}

interface BaseInputVisibleProps extends BaseInputPropsProps {
    type: Exclude<BaseInputTypesType, 'hidden'>;
    required: boolean;
    extraInputAttrs?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputVisibleProps>;
}

interface BaseInputHiddenProps extends BaseInputPropsProps {
    type: 'hidden';
    required?: never;
    extraInputAttrs?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputHiddenProps>;
}

export type BaseInputProps = BaseInputVisibleProps | BaseInputHiddenProps;

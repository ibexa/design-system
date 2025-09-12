import React, { useContext } from 'react';

import { IconButton, IconButtonSize, IconButtonType } from '@ids-components/IconButton';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { ClearBtnProps } from './ClearBtn.types';

export const ClearBtn = ({ onClick, disabled = false }: ClearBtnProps) => {
    const Translator = useContext(TranslatorContext);
    const clearMsg = Translator.trans(/*@Desc("Clear")*/ 'ibexa.clear-btn.label');
    const componentClassName = createCssClassNames({
        'ids-clear-btn': true,
    });

    return (
        <IconButton
            ariaLabel={clearMsg}
            className={componentClassName}
            disabled={disabled}
            icon="discard"
            onClick={onClick}
            size={IconButtonSize.Small}
            title={clearMsg}
            type={IconButtonType.TertiaryAlt}
        />
    );
};

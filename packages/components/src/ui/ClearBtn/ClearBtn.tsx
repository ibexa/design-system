import React, { useContext } from 'react';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { ClearBtnProps } from './ClearBtn.types';

export const ClearBtn = ({ onClick, disabled = false }: ClearBtnProps) => {
    const Translator = useContext(TranslatorContext);
    const clearMsg = Translator.trans(/*@Desc("Clear")*/ 'ids.clear_btn.label');
    const componentClassName = createCssClassNames({
        'ids-clear-btn': true,
    });

    return (
        <Button
            ariaLabel={clearMsg}
            className={componentClassName}
            disabled={disabled}
            icon="discard"
            onClick={onClick}
            size={ButtonSize.Small}
            title={clearMsg}
            type={ButtonType.TertiaryAlt}
        />
    );
};

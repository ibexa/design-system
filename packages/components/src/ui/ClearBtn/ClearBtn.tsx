import React, { useContext } from 'react';

import IconButton from '../../IconButton';
import { TranslatorContext } from '@ids-context/Translator';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { ClearBtnProps } from './ClearBtn.types';

const ClearBtn = ({ onClick, disabled = false }: ClearBtnProps) => {
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
            size="small"
            title={clearMsg}
            type="tertiary-alt"
        />
    );
};

export default ClearBtn;

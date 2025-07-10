import React, { useContext } from 'react';

import Button from '../../Button';
import { TranslatorContext } from '@ids-context/Translator';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { ClearBtnProps } from './ClearBtn.types';

const ClearBtn = ({ onClick, disabled = false }: ClearBtnProps) => {
    const Translator = useContext(TranslatorContext);
    const clearMsg = Translator.trans(/*@Desc("Clear")*/ 'ibexa.clear-btn.label');
    const extraClasses = createCssClassNames({
        'ids-clear-btn': true,
    });

    return (
        <Button
            ariaLabel={clearMsg}
            disabled={disabled}
            extraClasses={extraClasses}
            icon="discard"
            onClick={onClick}
            size="small"
            title={clearMsg}
            type="tertiary-alt"
        />
    );
};

export default ClearBtn;

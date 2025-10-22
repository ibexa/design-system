import React, { useContext } from 'react';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { TranslatorContext } from '@ids-context/Translator';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { ChipProps } from './Chip.types';

export const Chip = ({ children, className = '', disabled = false, error = false, isDeletable = true, onDelete }: ChipProps) => {
    const Translator = useContext(TranslatorContext);
    const deleteMsg = Translator.trans(/*@Desc("Delete")*/ 'ibexa.chip.delete-btn.label');
    const componentClassName = createCssClassNames({
        'ids-chip': true,
        'ids-chip--disabled': disabled,
        'ids-chip--error': error,
        [className]: !!className,
    });

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onDelete) {
            onDelete(event);
        }
    };

    const renderDeleteButton = () => {
        if (!isDeletable) {
            return null;
        }

        return (
            <Button
                aria-label={deleteMsg}
                className="ids-chip__delete"
                disabled={disabled}
                icon="discard"
                isFocusable={true}
                onClick={handleDeleteClick}
                size={ButtonSize.Small}
                type={ButtonType.TertiaryAlt}
            />
        );
    };

    return (
        <div aria-disabled={disabled} className={componentClassName} tabIndex={disabled ? -1 : 0}>
            <div className="ids-chip__content">{children}</div>
            {renderDeleteButton()}
        </div>
    );
};

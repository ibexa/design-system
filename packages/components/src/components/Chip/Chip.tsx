import React, { useContext } from 'react';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { TranslatorContext } from '@ids-context/Translator';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { ChipProps } from './Chip.types';

export const Chip = ({ children, className = '', disabled = false, error = false, isClosable = true, onClose }: ChipProps) => {
    const Translator = useContext(TranslatorContext);
    const cleanMsg = Translator.trans(/*@Desc("Clear")*/ 'ids.clear_btn.label');
    const componentClassName = createCssClassNames({
        'ids-chip': true,
        'ids-chip--disabled': disabled,
        'ids-chip--error': error,
        [className]: !!className,
    });

    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClose) {
            onClose(event);
        }
    };

    const renderCloseButton = () => {
        if (!isClosable) {
            return null;
        }

        return (
            <Button
                aria-label={cleanMsg}
                className="ids-chip__close"
                disabled={disabled}
                onClick={handleCloseClick}
                icon="discard"
                isFocusable={true}
                size={ButtonSize.Small}
                type={ButtonType.TertiaryAlt}
            />
        );
    };

    return (
        <div aria-disabled={disabled} className={componentClassName} tabIndex={disabled ? -1 : 0}>
            <div className="ids-chip__content">{children}</div>
            {renderCloseButton()}
        </div>
    );
};

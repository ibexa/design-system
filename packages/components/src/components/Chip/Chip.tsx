import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { ChipProps } from './Chip.types';

export const Chip = ({ children, className = '', disabled = false, error = false, isClosable = true, onClose }: ChipProps) => {
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
            <button
                aria-label="Remove"
                className="ids-chip__close"
                disabled={disabled}
                onClick={handleCloseClick}
                tabIndex={disabled ? -1 : 0}
                type="button"
            >
                <Icon name="discard" size={IconSize.Small} />
            </button>
        );
    };

    return (
        <div aria-disabled={disabled} className={componentClassName} tabIndex={disabled ? -1 : 0}>
            <div className="ids-chip__content">{children}</div>
            {renderCloseButton()}
        </div>
    );
};

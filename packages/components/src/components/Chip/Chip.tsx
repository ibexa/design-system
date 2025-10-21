import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { ChipProps } from './Chip.types';

export const Chip = ({ children, className = '', isClosable = true, disabled = false, error = false, onClose, ...tagProps }: ChipProps) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const componentClassName = createCssClassNames({
        'ids-chip': true,
        'ids-chip--error': error,
        'ids-chip--disabled': disabled,
        'ids-chip--hidden': !isVisible,
        [className]: !!className,
    });

    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
        setIsVisible(false);

        if (onClose) {
            onClose(event as React.MouseEvent<HTMLButtonElement>);
        }
    };

    const renderCloseButton = () => {
        if (!isClosable) {
            return null;
        }

        return (
            <button
                type="button"
                className="ids-chip__close"
                disabled={disabled}
                onClick={handleCloseClick}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleCloseClick(event);
                    }
                }}
                aria-label={'Remove'}
                tabIndex={disabled ? -1 : 0}
            >
                <Icon name="discard" size={IconSize.Small} />
            </button>
        );
    };

    return (
        <div className={componentClassName} tabIndex={!disabled ? 0 : -1} aria-disabled={disabled}>
            <div className="ids-chip__content">{children}</div>
            {renderCloseButton()}
        </div>
    );
};

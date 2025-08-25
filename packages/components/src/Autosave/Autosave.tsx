import React, { useContext } from 'react';

import Icon from '../Icon';
import { TranslatorContext } from '../context/Translator';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { AutosaveProps } from './Autosave.types';

export const AUTOSAVE_STATUS = {
    ERROR: 'error',
    OFF: 'off',
    ON: 'on',
    SAVED: 'saved',
    SAVING: 'saving',
} as const;

const Autosave = ({ isDarkMode = false, isEnabled = true, status = 'on', lastSavedTime }: AutosaveProps) => {
    const Translator = useContext(TranslatorContext);
    const classes = createCssClassNames({
        'ids-autosave': true,
        'ids-autosave--error': status === AUTOSAVE_STATUS.ERROR,
        'ids-autosave--light': isDarkMode,
    });
    const tooltipMessage = 'content.autosave.turn_off.message';
    const getIconName = () => {
        if (!isEnabled) {
            return 'autosave-off';
        }

        switch (status) {
            case AUTOSAVE_STATUS.ON:
                return 'autosave-on';
            case AUTOSAVE_STATUS.SAVING:
                return 'autosave-saving';
            case AUTOSAVE_STATUS.SAVED:
                return 'autosave-saved';
            case AUTOSAVE_STATUS.ERROR:
                return 'autosave-error';
            default:
                return 'autosave-off';
        }
    };
    const getStatusMessage = () => {
        const offMessage = Translator.trans(/*@Desc("Autosave is off, draft not created")*/ 'content_edit.autosave.status_off.message');

        if (!isEnabled) {
            return offMessage;
        }

        switch (status) {
            case AUTOSAVE_STATUS.ON:
                return Translator.trans(/*@Desc("Autosave is on, draft created")*/ 'content_edit.autosave.status_on.message');
            case AUTOSAVE_STATUS.SAVING:
                return Translator.trans(/*@Desc("Saving")*/ 'content_edit.autosave.status_saving.message');
            case AUTOSAVE_STATUS.SAVED:
                return Translator.trans(/*@Desc("Autosave is on, draft saved %time%")*/ 'content_edit.autosave.status_saved.message.full', {
                    time: lastSavedTime?.toString() ?? '',
                });
            case AUTOSAVE_STATUS.ERROR:
                return Translator.trans(/*@Desc("Saving error")*/ 'content_edit.autosave.status_error.message');
            default:
                return offMessage;
        }
    };

    return (
        <div className={classes} title={isEnabled ? tooltipMessage : undefined}>
            <Icon className="ids-icon" name={getIconName()} size="small" />
            <div className="ids-autosave__status-message">{getStatusMessage()}</div>
        </div>
    );
};

export default Autosave;

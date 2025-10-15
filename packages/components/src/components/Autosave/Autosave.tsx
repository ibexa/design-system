import React, { useContext } from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { AutosaveProps, AutosaveStatus } from './Autosave.types';

export const Autosave = ({ isDarkMode = false, isEnabled = true, status = AutosaveStatus.On, lastSavedTime }: AutosaveProps) => {
    const Translator = useContext(TranslatorContext);
    const classes = createCssClassNames({
        'ids-autosave': true,
        'ids-autosave--error': status === AutosaveStatus.Error,
        'ids-autosave--light': isDarkMode,
    });
    const tooltipMessage = 'content.autosave.turn_off.message';
    const getIconName = () => {
        if (!isEnabled) {
            return 'autosave-off';
        }

        switch (status) {
            case AutosaveStatus.On:
                return 'autosave-on';
            case AutosaveStatus.Saving:
                return 'autosave-saving';
            case AutosaveStatus.Saved:
                return 'autosave-saved';
            case AutosaveStatus.Error:
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
            case AutosaveStatus.On:
                return Translator.trans(/*@Desc("Autosave is on, draft created")*/ 'content_edit.autosave.status_on.message');
            case AutosaveStatus.Saving:
                return Translator.trans(/*@Desc("Saving")*/ 'content_edit.autosave.status_saving.message');
            case AutosaveStatus.Saved:
                return Translator.trans(/*@Desc("Autosave is on, draft saved %time%")*/ 'content_edit.autosave.status_saved.message.full', {
                    time: lastSavedTime?.toString() ?? '',
                });
            case AutosaveStatus.Error:
                return Translator.trans(/*@Desc("Saving error")*/ 'content_edit.autosave.status_error.message');
            default:
                return offMessage;
        }
    };

    return (
        <div className={classes} title={isEnabled ? tooltipMessage : undefined}>
            <Icon className="ids-icon" name={getIconName()} size={IconSize.Small} />
            <div className="ids-autosave__status-message">{getStatusMessage()}</div>
        </div>
    );
};

import { useContext, useRef } from 'react';

import { TranslatorContext } from '@ids-context/Translator';

import BaseValidator from '../../validators/BaseValidator';
import ValidatorManager from '../../validators/ValidatorManager';

export default <T>(validators: BaseValidator<T>[] = []) => {
    const translator = useContext(TranslatorContext);
    const validatorManagerInstance = useRef(new ValidatorManager<T>(validators, { translator }));

    return validatorManagerInstance.current;
};

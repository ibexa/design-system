import { useContext, useRef } from 'react';

import { TranslatorContext } from '@ids-context/Translator';

import BaseValidator from '../../validators/BaseValidator';
import ValidatorManager from '../../validators/ValidatorManager';

export default (validators: BaseValidator[] = []) => {
    const translator = useContext(TranslatorContext);
    const validatorManagerInstance = useRef(new ValidatorManager(validators, { translator }));

    return validatorManagerInstance.current;
};

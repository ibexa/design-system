import { useRef } from 'react';

import BaseValidator from '../../validators/BaseValidator';
import ValidatorManager from '../../validators/ValidatorManager';

export default (validators: BaseValidator[] = []) => {
    const vaildatorManagerInstance = useRef(new ValidatorManager(validators));

    return vaildatorManagerInstance.current;
};

import { useMemo, useRef } from 'react';

import { generateSimpleNumberId } from '../shared/generators';

export const useGenerateSimpleNumberId = () => {
    const isIdAlreadyGenerated = useRef(false);
    const generatedId = useMemo(() => generateSimpleNumberId(), [isIdAlreadyGenerated]);

    isIdAlreadyGenerated.current = true;

    return generatedId;
};

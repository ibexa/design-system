import { useId, useMemo, useRef } from 'react';

import { generateSimpleNumberId } from '@ids-shared/generators';

export const useGenerateSimpleNumberId = () => {
    const isIdAlreadyGenerated = useRef(false);
    const generatedId = useMemo(() => generateSimpleNumberId(), [isIdAlreadyGenerated]);

    isIdAlreadyGenerated.current = true;

    return generatedId;
};

export const useGetOrCreateId = ({ prefix, id }: { prefix?: string; id?: string }) => {
    const generatedId = useId();

    return id ?? (prefix ? `${prefix}-${generatedId}` : generatedId);
};

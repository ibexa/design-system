let simpleNumberIdCounter = 0;

export const generateSimpleNumberId = () => {
    simpleNumberIdCounter++;

    return simpleNumberIdCounter;
};

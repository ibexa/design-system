type ResolveFunctionType = () => void;

export const sleep = (timeout: number) =>
    new Promise<void>((resolve: ResolveFunctionType) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });

export const createCssClassNames = (classes: Record<string, boolean>) => {
    if (Object.prototype.toString.call(classes) !== '[object Object]') {
        return '';
    }

    return Object.entries(classes)
        .reduce((total: string, [name, condition]: [string, boolean]) => {
            if (condition) {
                return `${total} ${name}`;
            }

            return total;
        }, '')
        .trim();
};

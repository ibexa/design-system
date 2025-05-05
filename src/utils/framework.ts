export const getFramework = () => {
    const mainWindow = window.parent;
    const urlParams = new URLSearchParams(mainWindow.location.search);
    const framework = urlParams.get('framework');

    return framework;
};

export const changeFramework = (name: string) => {
    const mainWindow = window.parent;
    const urlParams = new URLSearchParams(mainWindow.location.search);

    urlParams.set('framework', name);

    mainWindow.location.search = urlParams.toString();
};

class ConfigStorage {
    constructor() {
        this.config = {};
    }

    setConfig(key, value) {
        this.config[key] = value;
    }

    get(key) {
        return this.config[key];
    }
}

const configStorage = new ConfigStorage();

export default configStorage;

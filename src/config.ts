import userConfig from "../userConfig.json"

export const Config = {
    ...userConfig,
    root: __dirname
};

export default Config;
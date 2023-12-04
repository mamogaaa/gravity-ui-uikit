export declare enum Lang {
    Ru = "ru",
    En = "en"
}
interface Config {
    lang: `${Lang}`;
}
type Subscriber = (config: Config) => void;
export declare const configure: (newConfig: Partial<Config>) => void;
export declare const subscribeConfigure: (sub: Subscriber) => () => void;
export declare const getConfig: () => Config;
export {};

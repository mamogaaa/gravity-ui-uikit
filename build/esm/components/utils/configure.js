export var Lang;
(function (Lang) {
    Lang["Ru"] = "ru";
    Lang["En"] = "en";
})(Lang || (Lang = {}));
let subs = [];
const config = {
    lang: Lang.En,
};
export const configure = (newConfig) => {
    Object.assign(config, newConfig);
    subs.forEach((sub) => {
        sub(config);
    });
};
export const subscribeConfigure = (sub) => {
    subs.push(sub);
    return () => {
        subs = subs.filter((item) => item !== sub);
    };
};
export const getConfig = () => config;
import { Content } from "./index";

const state = {};

const update = () => {
    const fn = () => '';
    const content = Content || fn;
    const root = document.querySelector('#root');
    root.innerHTML = content();
}

export const _state = new Proxy(state, {
    set(target, property, value, receiver) {
        target[property] = value;
        update();
        console.log('111');
    }
});
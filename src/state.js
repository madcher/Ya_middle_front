import { App } from "./index";

const state = {};

state.count = 1;
state.route = '';
const update = () => {
    const fn = () => '';
    const content = App || fn;
    const root = document.querySelector('#root');
    root.innerHTML = content();
}

export const _state = new Proxy(state, {
    set(target, property, value, receiver) {
        target[property] = value;
        update();
    }
});
import { _fn } from './utils';
import { _state } from './state';

_state.count = 1;

const Header = () => {
    _fn.headerHandler = () => {
        alert('header')
    }

    return `
        <div onclick="_fn.headerHandler()">Header</div>
    `
}
export var Content = () => {
    _fn.fn = function(){alert('111')}

    _fn.countHandler = () => {
        console.log(_state);
        _state.count +=1;
    }
    return `
        ${Header()}
        <div onclick="_fn.fn()">1</div>
        <div>2</div>
        <button onclick="_fn.countHandler()">${_state.count}</button>
    `
}
const root = document.querySelector('#root');
root.innerHTML = Content();


_fn.update = () => {
    const root = document.querySelector('#root');
    root.innerHTML = Content();
}


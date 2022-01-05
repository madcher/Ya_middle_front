import { _fn } from './utils';
import { _state } from './state';

// добавить Router и пускай все обновляется в нем

const Header = () => {
    _fn.headerHandler = () => {
        alert('header')
    }

    return `
        <div onclick="_fn.headerHandler()">Header</div>
    `
}
export const App = () => {
    _fn.fn = function(){alert('111')}

    _fn.countHandler = () => {
        _state.count +=1;
    }

    _fn.changeRoute = (e) => {
        e.preventDefault();
        _state.route = '1';
    }
    return `
        ${Header()}
        <div onclick="_fn.fn()">1</div>
        <div>2</div>
        <a href="1.html" onclick="_fn.changeRoute(event)">go to 1</a>
        <button onclick="_fn.countHandler()">${_state.count}</button>
        ${_state.route}
    `
}
const root = document.querySelector('#root');
root.innerHTML = App();


_fn.update = () => {
    const root = document.querySelector('#root');
    root.innerHTML = App();
}


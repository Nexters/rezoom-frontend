import { observable, action } from 'mobx';

class Common {

    @observable
    counter = 0;

    @action
    increment = () => {
        this.counter += 1;
    }

    @action
    decrement = () => {
        this.counter -= 1;
    }
};

export default Common;

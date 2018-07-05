import { observable, action } from 'mobx';

class AuthStore {

    @observable isLogin = false;

    @action
    login() {
        this.isLogin = true;
    }

    @action
    logout() {
        this.isLogin = false;
    }
}

const authStore = new AuthStore();
export default authStore;

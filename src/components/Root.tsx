import * as React from 'react';
import { inject } from 'mobx-react';
import Common from '../stores/Common'

interface RootProps {
    store?: Common
}

@inject('store')
class Root extends React.Component<RootProps> {

    render() {

        const { store } = this.props;
        const isLogin = store!['Auth'].isLogin;
        console.log(store);
        return (
            <div className='rezoom'>
                <h1>Rezoom!</h1>
                <h2>Nexters 13th</h2>
                <h3>{`mobx 테스트 = ${isLogin}`}</h3>
            </div>
        );
    }
}

export default Root;

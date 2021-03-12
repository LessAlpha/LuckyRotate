import React from 'react';
// import { css } from 'emotion';
import Provider from './context/';
// import Nav from './features/Nav';
import Main from './features/Main';
import Pop from './features/Pop';
import InfoVersion from '../common/components/InfoVersion';

const App = () => {
    return (<Provider><div>
            {/* <Nav /> */}
            <Main />
            <InfoVersion />
            <Pop />
    </div></Provider>);
};

export default App;

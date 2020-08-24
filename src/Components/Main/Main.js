import React, { Component } from 'react';

import css from './Main.module.css';

import Search from '../Search/Search';
import Results from '../Results/Results';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className={css.DivMainContainer}>
                <Search/>
                <Results/>
            </div>
         );
    }
}
 
export default Main;
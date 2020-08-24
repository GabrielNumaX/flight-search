import React from 'react';

import  css from './Header.module.css'

const Header = () => {

    return ( 
        <header className={css.Header}>
            <h1>Flight Search Engine</h1>
        </header>
     );
}
 
export default Header;
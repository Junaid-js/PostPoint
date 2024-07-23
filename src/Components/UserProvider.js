import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [loginUser, setLoginUser] = useState({});

    return (
        <UserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

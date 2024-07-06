
import React, { createContext, useState, useContext } from 'react';
import { User } from '../models/user';
import { UserContextType } from '../models/userContextType';


const UserContext = createContext<UserContextType | undefined>(undefined);

//custom hook OVDE
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('Error! Use a UserProvider!');
    }
    return context;
};


export const UserProvider= ({children}: {children: React.ReactNode}) => {
    const [currentUserContext, setCurrentUserContext] = useState<User[]>([
        new User('','password1'), new User('','password1')
        
    ]);

 

    return (
        <UserContext.Provider value={{ currentUserContext, setCurrentUserContext }}>
            {children}
        </UserContext.Provider>
    );
};


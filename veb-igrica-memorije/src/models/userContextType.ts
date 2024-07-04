import { User } from "./user";
export interface UserContextType{

    currentUserContext: User[];
    setCurrentUserContext: React.Dispatch<React.SetStateAction<User[]>>;
}
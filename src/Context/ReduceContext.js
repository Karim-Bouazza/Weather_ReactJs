import { useContext, createContext, useReducer } from "react";
import ListReducer from "../Reducers/ListReducer";

export const ReduceContext = createContext([]);

const ReduceList = ({children}) => {
    const [list, dispatch] = useReducer(ListReducer, []);
    return (
        <ReduceContext.Provider value={{list, dispatch}}>
            {children}
        </ReduceContext.Provider>
    )
}

export const useList = () => {
    return useContext(ReduceContext);
}

export default ReduceList;

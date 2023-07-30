import { createContext, useContext, useState } from "react";


const ContexProvider=createContext();


const SearchProvider = ({children}) => {
  const [auth,setAuth]=useState({
    keywords:'',
    results:[]
  });  
  return (
        <>
            <ContexProvider.Provider value={[auth,setAuth]}>
                    {children}
            </ContexProvider.Provider>
        </>
  );
}


//custom hook...

const useSearch=()=>useContext(ContexProvider);

export  {useSearch,SearchProvider};
// module.exports={useSearch,SearchProvider};
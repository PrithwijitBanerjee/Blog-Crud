import React, { useState } from 'react'
import { useSearch } from '../../../Contex/SearchProvider'
import { axiosInstance } from '../../../Api/apiUrl';
import { useNavigate } from 'react-router-dom';
const SearchInputBlog = () => {
  const navigate=useNavigate();  
  const [search,setSearch]=useSearch(); //custom hooks...  
  const handleSearch=async e=>{
        e.preventDefault();
        try{
            const {data}=await axiosInstance.get(`search/${search?.keywords}`);
            setSearch({...search,results:data});
            navigate('/search');
        }catch(error)
        {
            console.log(error?.message);
        }
  }
  return (
        <>
            <div className="sidebar-item search-form">
                    <form action>
                        <input type="text" value={search?.keywords} onChange={e=>setSearch({...search, keywords: e.target.value})}/>
                        <button type="submit" onClick={handleSearch}><i className="icofont-search" /></button>
                    </form>
                </div>{/* End sidebar search formn*/}
        </>
  )
}

export default SearchInputBlog
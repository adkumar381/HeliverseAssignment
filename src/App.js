import React, { useEffect } from 'react';
import { useState } from 'react';
import "./App.css";
import Filteruser from './Filteruser'
import user from "./heliverse_mock_data.json";
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {

  const teams = useSelector(state => state.teams);
  const dispatch = useDispatch();
  const [modifyData, setModifyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(modifyData.length / itemsPerPage);
  const pageNumbers = [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const userToShow = modifyData.slice(startIndex, endIndex);
  const [showTeam, setShowTeam] = useState(false);


  useEffect(() => {
    setModifyData(user);
  }, []);

  const filter = (data) => {
    setShowTeam(false);
     setModifyData(data);
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  
  function handleClick(userdata) {
    if (userdata.available === true) {
      const check = teams.filter(t => t.userdata.domain === userdata.domain)
      if (check.length !== 0) {
        toast.error('Domain already present', {
          duration: 4000,
          position: 'top-center'
        })
      } else {
        toast.success('successfully add', {
          duration: 4000,
          position: 'top-center'
        })
        const team = { userdata };
        dispatch({ type: 'ADD_TEAM', payload: team });
      }
    }else{
      toast.error('Not Available', {
        duration: 4000,
        position: 'top-center'
      })
    }

  }


  return (
    <>
      <Toaster />
      <Filteruser filter={filter} users={user} />
      <div className='text-center'>
        <button className='show_team' onClick={() => setShowTeam(!showTeam)}>Show Team</button>
      </div>
      
      <div className='main'>
        {(!showTeam ? userToShow : teams).map((usr) => {
          return (
            <div className="card" key={!showTeam ? usr.id : usr.userdata.id}>
              <div className="card-Wrapper">
                <img src={!showTeam ? usr.avatar : usr.userdata.avatar} alt="user avatar" />
                <h1 className="userName">Name : {!showTeam ? usr.first_name : usr.userdata.first_name} {!showTeam ? usr.last_name : usr.userdata.last_name}</h1>
                <h3 className='email'>Email : {!showTeam ? usr.email : usr.userdata.email}</h3>
                <h3 className='gender'>Gender : {!showTeam ? usr.gender : usr.userdata.gender}</h3>
                <h4 className='domain'> Domain : {!showTeam ? usr.domain : usr.userdata.domain}</h4>
                <p>Available : {!showTeam ? usr.available.toString() : usr.userdata.available.toString()}</p>
                {!showTeam && <button className='btn' onClick={() => { handleClick(usr) }}>Add into Team</button>}
              </div>
            </div>
          );
        })}
      </div>

      {!showTeam && <div className='pagination'>
        <ul className="pagination_wrapper">
          {pageNumbers.map((pageNumber, n) => (
            <li key={pageNumber} className={currentPage === pageNumber ? "page-item highlight" : "page-item"} onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </li>
          ))}
        </ul>
      </div>}
    </>

  )
}

export default App
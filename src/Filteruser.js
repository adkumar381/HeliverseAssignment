import React, { useEffect, useState } from 'react'

const Filteruser = ({ filter, users }) => {
  const [domainFilter, setDomainFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    return (
      (user.domain === domainFilter || domainFilter === "") &&
      (user.gender === genderFilter || genderFilter === "") &&
      (user.available.toString() === availabilityFilter || availabilityFilter === "") &&
      (user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase()))
    );
  });
  useEffect(() => {
    filter(filteredUsers);
  }, [search, availabilityFilter, genderFilter, domainFilter]);



  return (
    <>
    <div className='searchBar'>
      <div className='seach_wrapper'>
        <label>Search</label>
        <input type="text" name="search" id="search" onChange={(e) => setSearch(e.target.value)} />
      </div>
    

      
        <div>
          <h2 className='filterHeading'>Filter Options</h2>
          <div className='filter'>
          <div className='filterSubHeading'>
            <label>
              Domain:
              <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Business Development">Business Development</option>
                <option value="Management">Management</option>
              </select>
            </label>
          </div>
          <div className='filterSubHeading'>
            <label>
              Gender:
              <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Agender">Agender</option>
                <option value="Bigender">Bigender</option>
              </select>
            </label>
          </div>
          <div className='filterSubHeading'>
            <label>
              Availability:
              <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}>
                <option value="">All</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Filteruser;

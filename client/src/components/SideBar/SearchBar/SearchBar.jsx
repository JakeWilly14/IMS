import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USER } from '../../../utils/queries';
import { MDBInput, MDBCardHeader } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

export default function SearchBar({ setSearchResult }) {
  const [formState, setFormState] = useState({ searchInput: '' });
  const [searchUser, { loading, data, error }] = useLazyQuery(SEARCH_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      searchUser({ variables: { username: formState.searchInput } });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data && data.user) {
      setSearchResult(data.user);
    }
  }, [data, setSearchResult]);

  // Reset search result when search input is cleared
  useEffect(() => {
    if (!formState.searchInput) {
      setSearchResult(null);
    }
  }, [formState.searchInput, setSearchResult]);

  return (
    <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
      <h5 className="mb-0 text-white">Space Buddies:</h5>

      <div className='d-flex justify-content-end'>
        <form
        className="d-flex p-3"
        onSubmit={handleFormSubmit}
        >
        <MDBInput
          id="searchInput"
          name="searchInput"
          type="text"
          onChange={handleChange}
        />
        <Button className="m-auto ms-2" color="primary" size="md" type="submit" 
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            backgroundImage: "linear-gradient(to right, #ff00cc, #333399)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
          Search
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    </MDBCardHeader>
  );
}

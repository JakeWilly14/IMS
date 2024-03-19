import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USER } from '../../utils/queries';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';

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
    <form
      className="text-white d-flex justify-content-center align-items-center p-3"
      onSubmit={handleFormSubmit}
    >
      <MDBInput
        id="searchInput"
        name="searchInput"
        type="text"
        onChange={handleChange}
      />
      <MDBBtn className="m-auto" color="primary" size="md" rippleColor="dark" type="submit">
        Search
      </MDBBtn>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

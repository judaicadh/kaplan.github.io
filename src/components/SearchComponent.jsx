// src/components/SearchComponent.jsx
import { useState } from 'react';
import Fuse from 'fuse.js';

// Sample data
const archiveData = [
  {
    title: 'ארכיון 1',
    description: 'תיאור עבור פריט ארכיון 1',
    date: '1850-01-01',
    location: { lat: 31.7683, lng: 35.2137 },
  },
  {
    title: 'ארכיון 2',
    description: 'תיאור עבור פריט ארכיון 2',
    date: '1900-05-10',
    location: { lat: 32.0853, lng: 34.7818 },
  },
];

const fuseOptions = {
  keys: ['title', 'description'],
  threshold: 0.3,
};

const SearchComponent = ({ onSearchResults }) => {
  const [searchResults, setSearchResults] = useState(archiveData);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fuse = new Fuse(archiveData, fuseOptions);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    const results = fuse.search(searchTerm).map((result) => result.item);
    setSearchResults(results);
    onSearchResults(results); // Pass the results back to the parent (Astro)
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      const filteredResults = searchResults.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
      setSearchResults(filteredResults);
      onSearchResults(filteredResults); // Pass the filtered results to the parent (Astro)
    }
  };

  return (
    <div>
      <input type="text" placeholder="Search archives" onInput={handleSearch} />
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="end-date">End Date:</label>
        <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleDateChange}>Filter by Date</button>
      </div>
    </div>
  );
};

export default SearchComponent;
import { useEffect, useState } from 'react';
import { RestaurantListItem } from './components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';
import './App.css';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [zip, setZip] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleBusinesses = async () => {
    const res = await fetch(`./netlify/functions/fetch-yelp?zip=${zip}`);
    const data = await res.json();
    setBusinesses(data);
  };

  const filterBusinesses = () => {
    const filteredBusinesses = businesses.filter(
      business => business.name
        .toLowerCase()
        .includes(search));
  };

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input type="text" placeholder="zip" value={ zip } onChange={ (e) => setZip(e.target.value) } />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder="search" value={ search } onChange={ (e) => setSearch(e.target.value.toLowerCase()) } />
          <button onClick={ handleBusinesses }>search</button>
        </div>
      </div>
      { loading && <div className="loader"></div>}
      { !loading && businesses.map((b) => <RestaurantListItem key={ b.id } { ...b } />) }
    </div>
  );
}
export default App;
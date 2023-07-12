import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/get-url');
        setUrls(res.data);
      } catch (err) {
        alert('Error Fetching data');
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="th">
              Original Url
            </th>
            <th scope="col" className="th">
              Short Url
            </th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.originalUrl}</td>
              <td>{url.shortUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

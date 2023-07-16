import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [urls, setUrls] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/get-url');
      setUrls(res.data);
    } catch (err) {
      alert('Error Fetching data');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this url?')) {
      const data = { id: id };
      try {
        const res = await axios.post('http://localhost:8000/delete-url', data);
        if (res.data.message === 'Data deleted successfully') {
          alert('Deleted Successfully');
          fetchData();
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

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
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.originalUrl}</td>
              <td>{url.shortUrl}</td>
              <td><button className="btn btn-danger btn-xs" id='Delete' onClick={() => handleDelete(url.id)}><span className="glyphicon glyphicon-remove"></span> Del</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

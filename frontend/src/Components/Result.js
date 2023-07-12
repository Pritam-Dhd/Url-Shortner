import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios';

const Result = ({ inputUrl }) => {
  const [shortenLink, setShortenLink] = useState(['']);
  const url = 'https://api.shrtco.de/v2/shorten?url=';
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}${inputUrl}`);
        const { short_link } = res.data.result;
        setShortenLink(short_link);
        const data = {
          originalUrl: inputUrl,
          shortUrl: short_link
        };
        const res1 = await axios.post('http://localhost:8000/insert-url', data);
        if (res1.status === 200) {
          alert(res1.data.message); // Data added successfully
        } else if (res1.status === 400) {
          alert(res1.data.message); // URL already exists
        } else {
          alert('Error adding data'); // Data is not added
        }
        setLoading(false);
      }
      catch (err) {
        alert("Error Fetching data");
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [inputUrl])

  return (
    <>
      <div className='mt-5'>
        <span className='me-4'><input type="text" value={shortenLink} /> </span>
        <CopyToClipboard text={shortenLink} onCopy={() => {
          setCopied(true);
        }}>
          <button className="btn btn-primary" type="button">Copy</button>
        </CopyToClipboard>
        {copied && <span className='text-success ms-3 copied'>Copied!</span>}
      </div>
    </>
  )
}

export default Result
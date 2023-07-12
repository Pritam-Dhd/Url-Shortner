import React, { useState } from 'react'
import Result from './Result'
const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUrl, setInputUrl] = useState(['']);
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setInputUrl(inputValue);
    setSubmitted(true);
  }

  return (
    <>
      <div className="container  d-flex align-items-center justify-content-center mt-5 mb-5">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <h1 className='header'>Url Shortner</h1>
              <div className="input-group">
                <span className="input-group-text">Paste the Link here</span>
                <input type="text" aria-label="Enter the link" className="form-control" onChange={(e) => {
                  setInputValue(e.target.value)
                }} />
                <button className="btn btn-primary" type="submit" onClick={handleClick}>Submit</button>
              </div>
              {submitted && <Result inputUrl={inputUrl} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Input
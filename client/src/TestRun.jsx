import React, { useState } from 'react';
import TestRunPage from './components/TestRunPage';
import axios from 'axios';

const TestRun = () => {
  const [inner, setInner] = useState(async () => {
    const res = await axios.get("http://localhost:3000/api/els");
    return res.data["innerHTML"]
  })

  return (
    <div dangerouslySetInnerHTML={inner}></div>
  )
}

export default TestRun
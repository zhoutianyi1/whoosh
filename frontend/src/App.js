import { useState } from "react";

const App = () => {
  const [info, setInfo] = useState("");
  const [results, setResult] = useState([]);
  const [fixed, setFixed] = useState("");
  const rendered = 10;
  let quantity = 0;
  
  const handleInfo = e => {
    setInfo(e.target.value);
    console.log(fixed);
  }
  const search = () => {
    const data = { query: info };
    setFixed(info);
    fetch('http://127.0.0.1:5000/paper', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data);
      console.log(results);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }


  return (
    <div className="container">
      <div className="row">
        <br/>
        <div className="col m6 l8"> <input type="text" onChange={handleInfo} value={info}/></div>
        <div className="col m6 l4"><button className="btn" onClick={search}>search</button></div>
      </div>
      {results && results.map((result, index) => {

        const subIndex = result['abstract'].toLowerCase().indexOf(fixed.toLowerCase());
        if (subIndex == -1) {
          return;
        }
        const len = fixed.length;
        // quantity += 1;
        // if (quantity > 10) {
        //   quantity = 0;
        //   return <p>...</p>
        // }
        return (
        <div className="row">
          <span style={{fontSize: "1.2rem", fontWeight: "bold"}}>{`${result["title"]}: `}</span>
          <span>{`...${result["abstract"].substring(subIndex-10, subIndex)} `}</span>
          <span style={{color: "red"}}>{`${result["abstract"].substring(subIndex, subIndex + len)} `}</span>
          <span>{`${result["abstract"].substring(subIndex+len, subIndex + len + 30)}...`}</span>
        </div>)
      })}
    </div>
  );
}

export default App;

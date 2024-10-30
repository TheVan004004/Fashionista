
import './App.css';
import { useEffect, useState } from 'react'
function App() {
  const [listData, setListData] = useState([])
  const [name, setName] = useState("")
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const url = "http://localhost:4000/api/products";
    fetch(url)
      .then(response => {
        console.log(response)
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return response.json();
      })
      .then(data => {
        setListData(data)
      }
      )
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }
  const handleSearch = () => {
    const url = `http://localhost:4000/api/products/filter?name=${name}`;
    fetch(url)
      .then(response => {
        console.log(response)
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setListData(data)
      })
  }

  return (
    <div className="App">
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <button onClick={handleSearch}>search </button>
      {
        listData.map((data) => {
          console.log(data)
          return (
            <p>
              name: {data.name} quantity: {data.quantity}
            </p>

          )
        })
      }
    </div>
  );
}

export default App;

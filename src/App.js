import './App.css';
import HistoricTable from "./HistoricTable";
import React, {useEffect, useState} from 'react';;

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('/historic').then(res => res.json()).then(data => {
            setData(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="App">
            <HistoricTable data={data} loading={loading}/>
        </div>
    );
}

export default App;
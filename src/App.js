import React, { useEffect, useState } from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import styles from './App.css';
import HistoricTable from './HistoricTable';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('/historic').then((res) => res.json()).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  function renderSpinner() {
    return (
      <div className={styles.spinner}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      {loading && renderSpinner()}
      {!loading && (
        <Card>
          <HistoricTable data={data} />
        </Card>
      )}
    </div>
  );
}

export default App;

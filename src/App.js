import React, { useEffect, useState } from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import styles from './App.css';
import HistoricTable from './HistoricTable';
import metaJson from './meta_data.json';

function processData(rawData) {
  const processed = [];
  rawData.forEach((d) => {
    const { date = null, state = null } = d;
    const stateData = metaJson[state] || null;
    if (!state || !date || !stateData) {
      return;
    }

    const tConfirmed = d.positive || null;
    const dConfirmed = d.positiveIncrease || null;
    const tTested = d.totalTestResults || null;
    const dTested = d.totalTestResultsIncrease || null;
    const tHospitalized = d.hospitalized || null;
    const dHospitalized = d.hospitalizedIncrease || null;
    const tDeath = d.death || null;
    const dDeath = d.deathIncrease || null;
    const pop = stateData.population;
    const { density } = stateData;
    let [
      pPopulation,
      pTested,
      pHospitalized,
      pConfirmed,
      confirmedPercentageIncrease,
      testedPercentageIncrease,
    ] = [null, null, null, null, null, null];
    if (tTested && pop) {
      pPopulation = ((tTested / pop) * 100).toFixed(2);
    }
    if (dConfirmed && dTested) {
      pTested = ((dConfirmed / dTested) * 100).toFixed(2);
    }
    if (tDeath && tHospitalized) {
      pHospitalized = ((tDeath / tHospitalized) * 100).toFixed(2);
    }
    if (tHospitalized && tConfirmed) {
      pConfirmed = ((tHospitalized / tConfirmed) * 100).toFixed(2);
    }
    if (dConfirmed && tConfirmed && (tConfirmed - dConfirmed !== 0)) {
      confirmedPercentageIncrease = ((dConfirmed / (tConfirmed - dConfirmed)) * 100).toFixed(2);
    }
    if (dTested && tTested && (tTested - dTested !== 0)) {
      testedPercentageIncrease = ((dTested / (tTested - dTested)) * 100).toFixed(2);
    }

    processed.push({
      date,
      state,
      population: pop,
      density,
      tTested,
      dTested,
      pPopulation,
      pTested,
      pHospitalized,
      tConfirmed,
      pConfirmed,
      dConfirmed,
      confirmedPercentageIncrease,
      testedPercentageIncrease,
      tHospitalized,
      dHospitalized,
      tDeath,
      dDeath,
    });
  });

  return processed;
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('https://covidtracking.com/api/states/daily')
      .then((res) => res.json())
      .then((d) => processData(d))
      .then((processedData) => {
        setData(processedData);
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

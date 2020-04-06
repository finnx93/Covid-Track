import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';


function HistoricTable(props) {
  const { data } = props;

  function renderHead() {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">State</TableCell>
          <TableCell align="center">Population</TableCell>
          <TableCell align="center">Density</TableCell>
          <TableCell align="center">Total Tested</TableCell>
          <TableCell align="center">Delta</TableCell>
          <TableCell align="center">%Population</TableCell>
          <TableCell align="center">Total Confirmed</TableCell>
          <TableCell align="center">Delta</TableCell>
          <TableCell align="center">%Tested</TableCell>
          <TableCell align="center">Total Hospitalized</TableCell>
          <TableCell align="center">Delta</TableCell>
          <TableCell align="center">%Confirmed</TableCell>
          <TableCell align="center">Total Death</TableCell>
          <TableCell align="center">Delta</TableCell>
          <TableCell align="center">%Hospitalized</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function renderBody() {
    return (
      <TableBody>
        {data.map((d, index) => (
          <TableRow key={index}>
            <TableCell align="center">{d.date}</TableCell>
            <TableCell align="center">{d.state}</TableCell>
            <TableCell align="center">{d.population}</TableCell>
            <TableCell align="center">{d.density}</TableCell>
            <TableCell align="center">{d.tTested}</TableCell>
            <TableCell align="center"
            >
             {`${d.dTested}(${d.testedPercentageIncrease}%)`}</TableCell>
            <TableCell align="center">{d.pPopulation}</TableCell>
            <TableCell align="center">{d.tConfirmed}</TableCell>
            <TableCell
              align="center"
            >
              {`${d.dConfirmed}(${d.confirmedPercentageIncrease}%)`}
            </TableCell>
            <TableCell align="center">{d.pTested}</TableCell>
            <TableCell align="center">{d.tHospitalized}</TableCell>
            <TableCell align="center">{d.dHospitalized}</TableCell>
            <TableCell align="center">{d.pConfirmed}</TableCell>
            <TableCell align="center">{d.tDeath}</TableCell>
            <TableCell align="center">{d.dDeath}</TableCell>
            <TableCell align="center">{d.pHospitalized}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        {renderHead()}
        {renderBody()}
      </Table>
    </TableContainer>
  );
}

export default HistoricTable;

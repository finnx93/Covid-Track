import React from 'react';
import { CircularProgress } from "@material-ui/core";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

function HistoricTable(props) {
    const { data, loading } = props;

    function renderHead() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Population</TableCell>
                    <TableCell align="right">Density</TableCell>
                    <TableCell align="right">Total Tested</TableCell>
                    <TableCell align="right">Delta</TableCell>
                    <TableCell align="right">%Population</TableCell>
                    <TableCell align="right">Total Confirmed</TableCell>
                    <TableCell align="right">Delta</TableCell>
                    <TableCell align="right">%Tested</TableCell>
                    <TableCell align="right">Total Hospitalized</TableCell>
                    <TableCell align="right">Delta</TableCell>
                    <TableCell align="right">%Confirmed</TableCell>
                    <TableCell align="right">Total Death</TableCell>
                    <TableCell align="right">Delta</TableCell>
                    <TableCell align="right">%Hospitalized</TableCell>
                </TableRow>
            </TableHead>
        );
    }

    function renderBody() {
        return (
            <TableBody>
                {data.map((d, index) => {
                    return <TableRow key={index}>
                        <TableCell align="right">{d['date']}</TableCell>
                        <TableCell align="right">{d['state']}</TableCell>
                        <TableCell align="right">{d['population']}</TableCell>
                        <TableCell align="right">{d['density']}</TableCell>
                        <TableCell align="right">{d['tTested']}</TableCell>
                        <TableCell align="right">{d['dTested']}</TableCell>
                        <TableCell align="right">{d['pPopulation']}</TableCell>
                        <TableCell align="right">{d['tConfirmed']}</TableCell>
                        <TableCell
                            align="right">{d['dConfirmed'] && `${d['dConfirmed']}(${d['dConfirmedPercentage']}%)`}</TableCell>
                        <TableCell align="right">{d['pTested']}</TableCell>
                        <TableCell align="right">{d['tHospitalized']}</TableCell>
                        <TableCell align="right">{d['dHospitalized']}</TableCell>
                        <TableCell align="right">{d['pConfirmed']}</TableCell>
                        <TableCell align="right">{d['tDeath']}</TableCell>
                        <TableCell align="right">{d['dDeath']}</TableCell>
                        <TableCell align="right">{d['pHospitalized']}</TableCell>
                    </TableRow>
                })
                }
            </TableBody>
        )
    }
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                {renderHead()}
                {loading ? <CircularProgress /> : renderBody()}
            </Table>
        </TableContainer>
    );
}

export default HistoricTable;
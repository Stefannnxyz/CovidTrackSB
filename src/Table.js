import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { numberWithCommas, AddPlus, Sort } from "./Utils.js";
import { FormControl, Select, MenuItem } from "@material-ui/core";

function MyTable() {
  const [countries, setCountries] = useState([]);
  const [yCountries, setYCountries] = useState([]);
  const [sortType, setSortType] = useState("cases");

  useEffect( () => { 
    const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) =>  response.json())
    .then((data) => {
      setCountries(data);
    })
  }
  
  getCountriesData();
  }, []);
  
  useEffect( () => { 
    const getYCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
    .then((response) =>  response.json())
    .then((data) => {
      setYCountries(data);
    })
  }
  
  getYCountriesData();
  }, []);

  let i = 0;
  var tableData = [];

  if(yCountries.length <= 0 || yCountries == null)
    return(<div><strong>Waiting for covid-19 data to be loaded...</strong></div>);

  countries.map((country) => {
    tableData.push({
        country: country.country,
        cases: country.cases,
        newCases: country.cases - yCountries[i].cases,
        recovered: country.recovered,
        newRecovered: country.recovered - yCountries[i].recovered,
        deaths: country.deaths,
        newDeaths: country.deaths - yCountries[i].deaths,
        active: country.active,
        newActive: country.active - yCountries[i].active,
        critical: country.critical,
        newCritical: country.critical - yCountries[i].critical,
        tests: country.tests,
        newTests: country.tests - yCountries[i].tests,
        cases1M: country.cases / (country.population / 1000000),
        deaths1M: country.deaths / (country.population / 1000000),
        recovered1M: country.recovered / (country.population / 1000000),
        active1M: country.active / (country.population / 1000000),
        critical1M: country.critical / (country.population / 1000000),
        tests1M: country.tests / (country.population / 1000000)
    });

    i++;
  });

  tableData = Sort(tableData);

  return (
    <div>
        <div className="source">Source: disease.sh</div>

        <Paper>
          <Table className="table">
              <TableHead style={{backgroundColor: "white", position: "relative"}}>
                <TableRow style={{backgroundColor: "white", position: "sticky", top: 0}}>
                    <TableCell style={{backgroundColor: "white"}}><strong  style={{backgroundColor: "white"}}>Country</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Cases</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>New Cases</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Deaths</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>New Deaths</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Recovered</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>New Recovered</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Active Cases</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Active Cases Variation (today-yesterday)</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Critical</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Critical Cases variation (today-yesterday)</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Tests</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>New Tests</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Cases per 1Mil</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Deaths per 1Mil</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Recovered per 1Mil</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Active Cases per 1Mil</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Critical per 1Mil</strong></TableCell>
                    <TableCell style={{backgroundColor: "white"}}><strong style={{backgroundColor: "white"}}>Tests per 1Mil</strong></TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
            {tableData.map(country => (
                <TableRow style={{backgroundColor: "white"}}>
                <TableCell style={{backgroundColor: "white"}}>{country.country}</TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(country.cases)}</TableCell>
                <TableCell style={{backgroundColor: "white", color: "rgb(228, 228, 15)"}}><strong  style={{backgroundColor: "white"}}>{AddPlus(numberWithCommas(country.newCases))}</strong></TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(country.deaths)}</TableCell>
                <TableCell style={{backgroundColor: "white", color: "red"}}><strong  style={{backgroundColor: "white"}}>{AddPlus(numberWithCommas(country.newDeaths))}</strong></TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(country.recovered)}</TableCell>
                <TableCell style={{backgroundColor: "white", color: "yellowgreen"}}><strong  style={{backgroundColor: "white"}}>{AddPlus(numberWithCommas(country.newRecovered))}</strong></TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(country.active)}</TableCell>
                <TableCell style={{backgroundColor: "white", color: "orange"}}><strong  style={{backgroundColor: "white"}}>{AddPlus(numberWithCommas(country.newActive))}</strong></TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(country.critical)}</TableCell>
                <TableCell style={{backgroundColor: "white", color: "purple"}}><strong  style={{backgroundColor: "white"}}>{AddPlus(numberWithCommas(country.newCritical))}</strong></TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(country.tests)}</TableCell>
                <TableCell style={{backgroundColor: "white", color: "blue"}}><strong  style={{backgroundColor: "white"}}>{AddPlus(numberWithCommas(country.newTests))}</strong></TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(parseFloat(country.cases1M).toFixed(1))}</TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(parseFloat(country.deaths1M).toFixed(1))}</TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(parseFloat(country.recovered1M).toFixed(1))}</TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(parseFloat(country.active1M).toFixed(1))}</TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(parseFloat(country.critical1M).toFixed(1))}</TableCell>
                <TableCell style={{backgroundColor: "white"}}>{numberWithCommas(parseFloat(country.tests1M).toFixed(1))}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
    </div>
  );
}

export default MyTable;
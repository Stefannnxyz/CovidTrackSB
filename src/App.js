import React, { useState, useEffect } from 'react';
import './App.css';
import DailyInfoBox from "./DailyInfoBox";
import TotalInfoBox from "./TotalInfoBoxes.js";
import { TransformData } from "./Utils";

export var TextColor = {
  death: "Red",
  case: "Yellow",
  test: "Blue",
  recovered: "Green",
  critical: "Purple",
  activecase: "Orange",
  normal: "Black"
}

function App() {
  const [world, setWorld] = useState({});
  const [yWorld, setYWorld] = useState({});

  useEffect( () => { 
      const getWorldData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all?yesterday=true")
      .then((response) =>  response.json())
      .then((data) => {
        setYWorld(data);
      })
    }

    getWorldData();
  }, []);

  useEffect( () => { 
    const getWorldYesterdayData = async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
    .then((response) =>  response.json())
    .then((data) => {
      setWorld(data);
    })
  }

  getWorldYesterdayData();
}, []);

  return (
    <div className="App">
    { /* Daily Info Boxes */} 
      <div>
        <h1 className="subTitle">New Covid-19 Info</h1>
        <div style={{display: "block"}}>
            <DailyInfoBox className="InfoBox" title="New Cases" value={TransformData(world.todayCases)} color={TextColor.case}/>
            <DailyInfoBox className="InfoBox" title="New Recoverd" value={TransformData(world.todayRecovered)} color={TextColor.recovered}/>
            <DailyInfoBox className="InfoBox" title="New Deaths" value={TransformData(world.todayDeaths)} color={TextColor.death}/>
            <DailyInfoBox className="InfoBox" title="New Active Cases" value={TransformData(world.active - yWorld.active)} color={TextColor.activecase}/>
            <DailyInfoBox className="InfoBox" title="New Tests" value={TransformData(world.tests - yWorld.tests)} color={TextColor.test}/>
            <DailyInfoBox className="InfoBox" title="New Critical" value={TransformData(world.critical - yWorld.critical)} color={TextColor.critical}/>
        </div>
      </div>

        { /* Info Boxes */} 
        <div>
        <h1 className="subTitle">Total Covid-19 Info</h1>
          <TotalInfoBox className="InfoBox" title="Total Cases" value={TransformData(world.cases)} color={TextColor.case}/>
          <TotalInfoBox className="InfoBox" title="Total Recoverd" value={TransformData(world.recovered)} color={TextColor.recovered}/>
          <TotalInfoBox className="InfoBox" title="Total Deaths" value={TransformData(world.deaths)} color={TextColor.death}/>
          <TotalInfoBox className="InfoBox" title="Total Active Cases" value={TransformData(world.active)} color={TextColor.activecase}/>
          <TotalInfoBox className="InfoBox" title="Total Tests" value={TransformData(yWorld.tests)} color={TextColor.test}/>
          <TotalInfoBox className="InfoBox" title="Total Critical" value={TransformData(world.critical)} color={TextColor.critical}/>
      </div>

      { /* Table */ }
      <h1 className="subTitle">Covid-19 Table</h1>
    </div>
  );
}

export default App;

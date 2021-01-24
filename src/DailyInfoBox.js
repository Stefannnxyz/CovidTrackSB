import React from "react";
import { Card, CardContent, Typography } from '@material-ui/core'
import "./DailyInfoBoxes.css";
import "./TextColor.css"

function DailyInfoBox({title, value, color}) {
    let Value = { value };
    let finalValue = "+";
    if (parseFloat(value) >= 0){
        finalValue += Value.value;        
    }
    else {
        finalValue = Value.value;     
    }

    return (
    <Card className={ "DailyInfoBox" + color}>
        <CardContent style={{backgroundColor: "white"}}>
            <Typography style={{backgroundColor: "white"}} className="title" color="textSecondary"> { title } </Typography>
            <h2 style={{backgroundColor: "white"}} className="Text"> { finalValue } </h2>
        </CardContent>
    </Card>
    )
}

export default DailyInfoBox;
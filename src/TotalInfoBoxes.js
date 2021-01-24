import React from "react";
import { Card, CardContent, Typography } from '@material-ui/core'
import "./TextColor.css"
import "./TotalInfoBoxes.css"

function TotalInfoBox({title, value, color}) {
    return (
    <Card className={ "TotalInfoBox" + color}>
        <CardContent style={{backgroundColor: "white"}}>
            <Typography style={{backgroundColor: "white"}} className="title" color="textSecondary"> { title } </Typography>
            <h2 style={{backgroundColor: "white"}} className="Text"> { value } </h2>
        </CardContent>
    </Card>
    )
}

export default TotalInfoBox;
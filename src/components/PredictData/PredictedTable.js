import React, { Fragment } from "react";
import {
  ListItemText,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const PredicateTable = ({
  tableHeading,
  percentage,
  predicted_high,
  OtoHpercent,
  predicted_low,
  OtoLpercent,
}) => {
  const useStyles = makeStyles({
    text: {
      fontWeight: "bold",
    },
    specialCell: {
      backgroundColor: "#0F062B",
      color: "white",
    },
  });
  const classes = useStyles();
  const changeFloat = (data) => {
    return parseFloat(data).toFixed(2);
  };

  return (
    <Fragment>
      <div style={{ flex: "1 1 auto", margin: "2em", overflowX: "scroll" }}>
        <ListItemText
          primary={tableHeading}
          classes={{ primary: classes.text }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              {percentage.map((data, index) => {
                return (
                  <TableCell
                    className={index === 0 ? classes.specialCell : ""}
                    align="center"
                  >
                    <b>{data}%</b>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <b>Predicted High</b>
              </TableCell>
              {predicted_high.map((data, index) => {
                console.log(data);
                return (
                  <TableCell
                    className={index === 0 ? classes.specialCell : ""}
                    align="center"
                  >
                    $ {changeFloat(data)}
                    {OtoHpercent ? (
                      <div style={{ fontSize: "10px" }}>
                        ( {changeFloat(OtoHpercent[index])}% )
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <b>Predicted Low</b>
              </TableCell>
              {predicted_low.map((data, index) => {
                return (
                  <TableCell
                    className={index === 0 ? classes.specialCell : ""}
                    align="center"
                  >
                    $ {changeFloat(data)}
                    {OtoLpercent ? (
                      <div style={{ fontSize: "10px" }}>
                        ( {changeFloat(OtoLpercent[index])}% )
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
};

export default PredicateTable;

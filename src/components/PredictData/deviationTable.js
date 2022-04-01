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

const DeviationTable = ({ tableHeading, first_percent, first }) => {
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
    <div style={{ flex: "1 1 auto", marginRight: "2em" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <b>{tableHeading}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              {first_percent ? changeFloat(first_percent[0]) : ""}%
            </TableCell>
            <TableCell align="center">
              $ {first ? changeFloat(first[0]) : ""}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              {first_percent
                ? first_percent.length > 1
                  ? changeFloat(first_percent[1])
                  : ""
                : ""}
              %
            </TableCell>
            <TableCell align="center">
              $ {first ? (first.length > 1 ? changeFloat(first[1]) : "") : ""}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DeviationTable;

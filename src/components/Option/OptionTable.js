import React from "react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import MUIDataTable from "mui-datatables";

export function OptionTable({
  OptionData,
  OptionHeading,
  optionDataRowSelectHandler,
  isLoaded,
}) {
  if (!isLoaded) return <></>;
  console.log("companies", OptionData);
  console.log("columns", OptionHeading);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const handleClick = (newSelectionModel, rowState) => {
    console.log("rowState", rowState);
    console.log("newSelectionModel", newSelectionModel);
  };
  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        data={OptionData}
        columns={OptionHeading}
        options={{
          selectableRows: true,
          onRowsSelect: (curRowSelected, allRowsSelected) => {
            optionDataRowSelectHandler(allRowsSelected);
          },
        }}
        className="my-2"
      />
    </ThemeProvider>
  );
}

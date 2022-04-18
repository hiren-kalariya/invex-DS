import React from "react";

import { DataGrid } from "@mui/x-data-grid";

export function OptionTable({
  OptionData,
  OptionHeading,
  optionDataRowSelectHandler,
}) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={OptionData}
        columns={OptionHeading}
        pageSize={10}
        checkboxSelection
        pagination
        onSelectionModelChange={(newSelectionModel) => {
          optionDataRowSelectHandler(newSelectionModel);
        }}
      />
    </div>
  );
}

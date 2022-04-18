import React, { Fragment, useState } from "react";
import {
  Box,
  MenuItem,
  ButtonGroup,
  Select,
  InputAdornment,
  OutlinedInput,
  Button,
  FormControl,
  Snackbar,
  Alert,
  Grow,
  List,
  ListItem,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import PredicateTable from "./PredictedTable";

import { makeStyles } from "@mui/styles";

import axios from "axios";
import DeviationTable from "./deviationTable";

const GetTitle = (timestamp) => {
  switch (timestamp) {
    case "5":
      return "Fixed Predicted";
    case "10":
      return "Next Week Prediction(5 Trading Days)";
    case "20":
      return "Next Two Week Prediction(10 Trading Days)";
    case "60":
      return "Semi Quarterly Prediction(30 Trading Days)";

    default:
      return "";
  }
};

const PredictCSV = () => {
  const [percentage, setPercentage] = useState(0);

  const [filterDays, setFilterDays] = useState("180");
  const [csvFile, setCsvFile] = useState("");
  const [csvFileName, setCsvFileName] = useState("Upload CSV");
  const [open, setOpen] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [errMsg, setErrMsg] = useState("Something went wrong");

  const [predictData, setPredictData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const [timePeriod, setTimePeriod] = useState("5");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (csvFile == "") {
      setErrMsg("CSV file Should between selected");
      setOpen(true);
    } else if (percentage < 0 || percentage > 100) {
      setErrMsg("Percentage Should between 0-100!");
      setOpen(true);
    } else {
      setOpenBackDrop(true);

      var formData = new FormData();
      formData.append("option", csvFile);
      formData.append("filter_days", filterDays);
      formData.append("percentage", percentage);

      axios
        .post(process.env.REACT_APP_BASE_URL + "/upload_csv", formData)
        .then((response) => {
          setPredictData(response.data);
          setDataLoaded(true);
          setOpenBackDrop(false);
        })
        .catch((e) => {
          setErrMsg("Something went wrong!");
          setOpen(true);
          setOpenBackDrop(false);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const selected = {
    color: "white",
    backgroundColor: "#0F062B",
    "&:hover": { color: "white", backgroundColor: "#0F062B" },
  };

  const unSelected = {
    "&:hover": { color: "white", backgroundColor: "#0F062B" },
  };

  // const changeFloat = (data) => {
  //   return parseFloat(data).toFixed(2);
  // };

  const fileuploadHandler = (e) => {
    setCsvFileName(e.target.files.item(0).name);
    setCsvFile(e.target.files.item(0));
  };

  return (
    <div className="container" style={{ padding: "50px 0 0" }}>
      <div className="offset-0 col-12">
        <div
          style={{ justifyContent: "space-around" }}
          className=" card d-flex flex-row flex-wrap w-100 p-4"
        >
          <Box className="my-2 mx-2 " sx={{}}>
            <p className="mb-1 my-auto mx-2 fw-bolder">Option</p>
            <FormControl
              sx={{
                m: 1,
                width: "25ch",
                border: "1px solid rgb(0 0 0 / 24%)",
                borderRadius: "4px",
                padding: "12.5px 14px",
              }}
              variant="outlined"
            >
              <input
                accept=".xlsx, .xls, .csv"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={fileuploadHandler}
              />
              <label
                htmlFor="raised-button-file"
                style={{ overflow: "hidden" }}
              >
                <Button
                  variant="raised"
                  component="span"
                  className={classes.button}
                  sx={{
                    height: "26px",
                    whiteSpace: "nowrap",
                    padding: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                  }}
                >
                  {csvFileName}
                </Button>
              </label>
            </FormControl>
          </Box>

          <Box className="my-2 mx-2 ">
            <p className="my-auto mx-2 fw-bolder">Filter Days</p>
            <Select
              value={filterDays}
              label="Age"
              onChange={(e) => setFilterDays(e.target.value)}
              sx={{ marginTop: 1.2, marginLeft: 1, padding: 0 }}
            >
              <MenuItem value={180}>6 Months</MenuItem>
              <MenuItem value={360}>1 Years</MenuItem>
              <MenuItem value={720}>2 Year</MenuItem>
              <MenuItem value={1800}>5 Year</MenuItem>
            </Select>
          </Box>
          <Box className="my-2 mx-2 ">
            <p className="mb-1 my-auto mx-2 fw-bolder">Percentage</p>
            <FormControl
              sx={{ m: 1, marginTop: 1, width: "25ch" }}
              variant="outlined"
            >
              <OutlinedInput
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                inputProps={{ max: 100, min: 0 }}
              />
            </FormControl>
          </Box>

          <button
            className="ml-3 px-4 my_button my-auto w-auto"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {dataLoaded ? (
          <div
            style={{ justifyContent: "space-around" }}
            className=" card d-flex flex-column flex-wrap align-items-center w-100 p-4 mt-4 mb-2"
          >
            <ButtonGroup
              color="inherit"
              disableRipple
              sx={{ color: "#0F062B", borderColor: "#0F062B" }}
            >
              <Button
                sx={timePeriod === "5" ? selected : unSelected}
                onClick={() => setTimePeriod("5")}
              >
                Weekly
              </Button>
              <Button
                sx={timePeriod === "10" ? selected : unSelected}
                onClick={() => setTimePeriod("10")}
              >
                Semi-Monthly
              </Button>
              <Button
                sx={timePeriod === "20" ? selected : unSelected}
                onClick={() => setTimePeriod("20")}
              >
                Monthly
              </Button>
              <Button
                sx={timePeriod === "60" ? selected : unSelected}
                onClick={() => setTimePeriod("60")}
              >
                Quaterly
              </Button>
            </ButtonGroup>
            <List
              sx={{
                width: "100%",
                maxWidth: "fitContent",
                bgcolor: "background.paper",
                border: "1px solid #0F062B",
                borderRadius: "5px",
                marginTop: "1rem",
              }}
            >
              {/* <ListItem> */}
              {/* <ListItemText
                  primary="O to H Volatility"
                  secondary={
                    changeFloat(predictData[timePeriod]["O to H"]) + "%"
                  }
                  classes={{ primary: classes.text }}
                /> */}
              {/* <Divider orientation="vertical" variant="middle" flexItem />
                <ListItemText
                  primary="O to L Volatility"
                  secondary={
                    changeFloat(predictData[timePeriod]["O to L"]) + "%"
                  }
                  classes={{ primary: classes.text }}
                />
              </ListItem> */}
              {/* <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Predicted High" 
                                        secondary={changeFloat(predictData[timePeriod]["predicted_high"])} />
                                    <ListItemText 
                                        primary="Predicted Low" 
                                        secondary={changeFloat(predictData[timePeriod]["predicted_low"])} />
                                </ListItem> */}

              {/* <Divider /> */}

              {predictData[timePeriod]["month_fixed_high"] &&
              predictData[timePeriod]["month_fixed_high"].length > 0 ? (
                <Fragment>
                  <PredicateTable
                    tableHeading="Next Month Prediction(20 Trading Days)"
                    percentage={predictData[timePeriod]["percentage"]}
                    predicted_high={predictData[timePeriod]["month_fixed_high"]}
                    predicted_low={predictData[timePeriod]["month_fixed_low"]}
                    OtoHpercent={predictData[timePeriod]["OtoHpercent"]}
                    OtoLpercent={predictData[timePeriod]["OtoLpercent"]}
                  />
                  <Divider />
                  <ListItem style={{ flexWrap: "wrap" }}>
                    <DeviationTable
                      tableHeading="1st SD"
                      first_percent={predictData[timePeriod]["first_percent"]}
                      first={predictData[timePeriod]["month_pred_final_FS"]}
                    />
                    <DeviationTable
                      tableHeading="2nd SD"
                      first_percent={predictData[timePeriod]["second_percent"]}
                      first={predictData[timePeriod]["month_pred_final_SS"]}
                    />
                    <DeviationTable
                      tableHeading="3rd SD"
                      first_percent={predictData[timePeriod]["third_percent"]}
                      first={predictData[timePeriod]["month_pred_final_TS"]}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              ) : (
                ""
              )}

              {/* ************************************************ Fixed Predicted Table  *************************************************************************** */}

              {predictData[timePeriod]["fixed_predicteed_high"] &&
              predictData[timePeriod]["fixed_predicteed_high"].length > 0 ? (
                <Fragment>
                  <PredicateTable
                    tableHeading={GetTitle(timePeriod)}
                    percentage={predictData[timePeriod]["percentage"]}
                    predicted_high={
                      predictData[timePeriod]["fixed_predicteed_high"]
                    }
                    predicted_low={
                      predictData[timePeriod]["fixed_predicted_low"]
                    }
                    OtoHpercent={predictData[timePeriod]["OtoHpercent"]}
                    OtoLpercent={predictData[timePeriod]["OtoLpercent"]}
                  />
                  <Divider />
                  <ListItem style={{ flexWrap: "wrap" }}>
                    <DeviationTable
                      tableHeading="1st SD (Open To Open)"
                      first_percent={predictData[timePeriod]["first_percent"]}
                      first={
                        predictData[timePeriod]["fixed_predicted_first_std"]
                      }
                    />
                    <DeviationTable
                      tableHeading="2nd SD (Open To Open)"
                      first_percent={predictData[timePeriod]["second_percent"]}
                      first={
                        predictData[timePeriod]["fixed_predicted_first_std"]
                      }
                    />
                    <DeviationTable
                      tableHeading="3rd SD (Open To Open)"
                      first_percent={predictData[timePeriod]["third_percent"]}
                      first={
                        predictData[timePeriod]["fixed_predicted_third_std"]
                      }
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              ) : (
                ""
              )}

              {/* ************************************************ Predicted Table  *************************************************************************** */}

              <PredicateTable
                tableHeading="Prediction Based On High & Low"
                percentage={predictData[timePeriod]["percentage"]}
                predicted_high={predictData[timePeriod]["predicted_high"]}
                OtoHpercent={predictData[timePeriod]["OtoHpercent"]}
                predicted_low={predictData[timePeriod]["predicted_low"]}
                OtoLpercent={predictData[timePeriod]["OtoLpercent"]}
              />

              <Divider />

              <ListItem style={{ flexWrap: "wrap" }}>
                <DeviationTable
                  tableHeading="1st SD"
                  first_percent={predictData[timePeriod]["first_percent"]}
                  first={predictData[timePeriod]["first"]}
                />
                <DeviationTable
                  tableHeading="2nd SD"
                  first_percent={predictData[timePeriod]["second_percent"]}
                  first={predictData[timePeriod]["second"]}
                />
                <DeviationTable
                  tableHeading="3rd SD"
                  first_percent={predictData[timePeriod]["third_percent"]}
                  first={predictData[timePeriod]["third"]}
                />
              </ListItem>
            </List>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={Grow}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PredictCSV;

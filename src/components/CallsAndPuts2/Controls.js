import { Box, Slider, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";

function getPreviousDay(date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}
function Controls({ handleSubmit }) {
  const [date, setDate] = useState(
    new Date(getPreviousDay()).toISOString().substring(0, 10)
  );
  const [monthInput, setMonthInput] = useState(100);
  const [strikeInput, setStrikeInput] = useState(20);
  const [callRange, setCallRange] = useState([0, 100000000]);
  const [putRange, setputRange] = useState([0, 100000000]);
  const [CPRange, setCPRange] = useState([0, 100000000]);
  const [closeValue, setCloseValue] = useState([0, 100000000]);
  const [volValue, setVolValue] = useState([0, 100000000]);
  const [oiValue, setoiValue] = useState([0, 100000000]);

  const [filterDays, setFilterDays] = useState("180");
  const [erfFilter, setHrfFilter] = useState(true);
  const [callRangeOption, setCallRangeOption] = useState(1);
  const [putRangeOption, setputRangeOption] = useState(1);
  const [CPRangeOption, setCPRangeOption] = useState(1);
  const [closeValueOption, setCloseValueOption] = useState(1);
  const [volValueOption, setColValueOption] = useState(1);
  const [oiValueOption, setOiValueOption] = useState(1);

  const handleExpiration = (e) => {
    setMonthInput(e.target.value);
  };

  const handleStrikeChange = (e) => {
    setStrikeInput(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleCallRangeChange = (value) => {
    setCallRange(value);
  };

  const handlePutRangeChange = (value) => {
    setputRange(value);
  };

  const handleCPRangeChange = (value) => {
    setCPRange(value);
  };

  const handleFilterDaysChange = (e) => {
    setFilterDays(e.target.value);
  };

  return (
    <React.Fragment>
      <div
        className="card flex-wrap d-flex flex-row justify-content-between my-2"
        style={{ overflow: "auto" }}
      >
        <div className=" card d-flex flex-row flex-wrap align-items-center justify-content-between w-100 p-4">
          <p className="my-auto fw-bolder">Expiration</p>
          <input
            type="number"
            value={monthInput}
            onChange={handleExpiration}
            className="mx-2 form-control my-auto "
            style={{ width: "100px" }}
          />
          <p className="my-auto mx-2 fw-bolder">Strike</p>
          <div className="d-flex flex-column align-items-start p-3">
            <label htmlFor="myinputRange" className="form-label mx-2 my-0 mt-2">
              {strikeInput}
            </label>
            <Slider
              aria-label="Strike"
              value={strikeInput}
              onChange={handleStrikeChange}
              sx={{
                color: "#0f062b",
              }}
              min={0}
              max={100}
              id="myinputRange"
              style={{ width: "100px" }}
            />
          </div>
          <p className="my-auto mx-2 fw-bolder">Date</p>
          <input
            type="date"
            className="mx-2 form-control my-auto w-auto"
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div
        className="flex-wrap d-flex flex-row justify-content-between my-2 card"
        style={{ overflow: "auto" }}
      >
        <div
          className=" card d-flex flex-row flex-wrap align-items-center justify-content-between w-100 p-4"
          style={{ rowGap: "18px" }}
        >
          <Box sx={{ width: 190 }} className="mx-2 choice-container">
            <p className=" my-auto fw-bolder">Call Range</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <div
                className={callRangeOption === 1 ? "active" : "deactive"}
                onClick={() => {
                  setCallRangeOption(1);
                }}
              >
                Min
              </div>
              <div
                className={callRangeOption === 2 ? "active" : "deactive"}
                onClick={() => {
                  setCallRangeOption(2);
                }}
              >
                Max
              </div>
              <div
                className={callRangeOption === 3 ? "active" : "deactive"}
                onClick={() => {
                  setCallRangeOption(3);
                }}
              >
                Range
              </div>
            </div>
            <div className="d-flex flex-row my-1 justify-content-center">
              {(callRangeOption === 1 || callRangeOption === 3) && (
                <div className="d-flex flex-column  mx-1 ">
                  <label>{callRangeOption === 1 ? "Min" : "From"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={callRange[0]}
                    onChange={(e) => {
                      if (callRangeOption === 1) {
                        handleCallRangeChange([e.target.value, 100000000]);
                      } else {
                        handleCallRangeChange([e.target.value, callRange[1]]);
                      }
                    }}
                  />
                </div>
              )}
              {(callRangeOption === 2 || callRangeOption === 3) && (
                <div className="d-flex flex-column  mx-1">
                  <label>{callRangeOption === 2 ? "Max" : "To"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={callRange[1]}
                    onChange={(e) => {
                      if (callRangeOption === 2) {
                        handleCallRangeChange([0, e.target.value]);
                      } else {
                        handleCallRangeChange([callRange[0], e.target.value]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Box>

          <Box sx={{ width: 190 }} className="mx-2">
            <p className="my-auto  fw-bolder">Put Range</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <div
                className={putRangeOption === 1 ? "active" : "deactive"}
                onClick={() => {
                  setputRangeOption(1);
                }}
              >
                Min
              </div>
              <div
                className={putRangeOption === 2 ? "active" : "deactive"}
                onClick={() => {
                  setputRangeOption(2);
                }}
              >
                Max
              </div>
              <div
                className={putRangeOption === 3 ? "active" : "deactive"}
                onClick={() => {
                  setputRangeOption(3);
                }}
              >
                Range
              </div>
            </div>
            <div className="d-flex flex-row my-1">
              {(putRangeOption === 1 || putRangeOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1 ">
                  <label>{putRangeOption === 1 ? "Min" : "From"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={putRange[0]}
                    onChange={(e) => {
                      if (putRangeOption === 1) {
                        handlePutRangeChange([e.target.value, 100000000]);
                      } else {
                        handlePutRangeChange([e.target.value, putRange[1]]);
                      }
                    }}
                  />
                </div>
              )}
              {(putRangeOption === 2 || putRangeOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1">
                  <label>{putRangeOption === 2 ? "Max" : "To"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={putRange[1]}
                    onChange={(e) => {
                      if (putRangeOption === 2) {
                        handlePutRangeChange([0, e.target.value]);
                      } else {
                        handlePutRangeChange([putRange[0], e.target.value]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Box>

          <Box sx={{ width: 190 }} className="mx-2">
            <p className="my-auto  fw-bolder">CP Range</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <div
                className={CPRangeOption === 1 ? "active" : "deactive"}
                onClick={() => {
                  setCPRangeOption(1);
                }}
              >
                Min
              </div>
              <div
                className={CPRangeOption === 2 ? "active" : "deactive"}
                onClick={() => {
                  setCPRangeOption(2);
                }}
              >
                Max
              </div>
              <div
                className={CPRangeOption === 3 ? "active" : "deactive"}
                onClick={() => {
                  setCPRangeOption(3);
                }}
              >
                Range
              </div>
            </div>
            <div className="d-flex flex-row my-1">
              {(CPRangeOption === 1 || CPRangeOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1 ">
                  <label>{CPRangeOption === 1 ? "Min" : "From"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={CPRange[0]}
                    onChange={(e) => {
                      if (CPRangeOption === 1) {
                        handleCPRangeChange([e.target.value, 100000000]);
                      } else {
                        handleCPRangeChange([e.target.value, CPRange[1]]);
                      }
                    }}
                  />
                </div>
              )}
              {(CPRangeOption === 2 || CPRangeOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1">
                  <label>{CPRangeOption === 2 ? "Max" : "To"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={CPRange[1]}
                    onChange={(e) => {
                      if (CPRangeOption === 2) {
                        handleCPRangeChange([0, e.target.value]);
                      } else {
                        handleCPRangeChange([CPRange[0], e.target.value]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Box>

          <Box sx={{ width: 190 }} className="mx-2">
            <p className="my-auto  fw-bolder">Close Value</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <div
                className={closeValueOption === 1 ? "active" : "deactive"}
                onClick={() => {
                  setCloseValueOption(1);
                }}
              >
                Min
              </div>
              <div
                className={closeValueOption === 2 ? "active" : "deactive"}
                onClick={() => {
                  setCloseValueOption(2);
                }}
              >
                Max
              </div>
              <div
                className={closeValueOption === 3 ? "active" : "deactive"}
                onClick={() => {
                  setCloseValueOption(3);
                }}
              >
                Range
              </div>
            </div>
            <div className="d-flex flex-row my-1">
              {(closeValueOption === 1 || closeValueOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1 ">
                  <label>{closeValueOption === 1 ? "Min" : "From"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={closeValue[0]}
                    onChange={(e) => {
                      if (closeValueOption === 1) {
                        setCloseValue([e.target.value, 100000000]);
                      } else {
                        setCloseValue([e.target.value, closeValue[1]]);
                      }
                    }}
                  />
                </div>
              )}
              {(closeValueOption === 2 || closeValueOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1">
                  <label>{closeValueOption === 2 ? "Max" : "To"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={closeValue[1]}
                    onChange={(e) => {
                      if (closeValueOption === 2) {
                        setCloseValue([0, e.target.value]);
                      } else {
                        setCloseValue([closeValue[0], e.target.value]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Box>

          <Box sx={{ width: 190 }} className="mx-2">
            <p className="my-auto  fw-bolder">Vol Value</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <div
                className={volValueOption === 1 ? "active" : "deactive"}
                onClick={() => {
                  setColValueOption(1);
                }}
              >
                Min
              </div>
              <div
                className={volValueOption === 2 ? "active" : "deactive"}
                onClick={() => {
                  setColValueOption(2);
                }}
              >
                Max
              </div>
              <div
                className={volValueOption === 3 ? "active" : "deactive"}
                onClick={() => {
                  setColValueOption(3);
                }}
              >
                Range
              </div>
            </div>
            <div className="d-flex flex-row my-1">
              {(volValueOption === 1 || volValueOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1 ">
                  <label>{volValueOption === 1 ? "Min" : "From"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={volValue[0]}
                    onChange={(e) => {
                      if (volValueOption === 1) {
                        setVolValue([e.target.value, 100000000]);
                      } else {
                        setVolValue([e.target.value, volValue[1]]);
                      }
                    }}
                  />
                </div>
              )}
              {(volValueOption === 2 || volValueOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1">
                  <label>{volValueOption === 2 ? "Max" : "To"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={volValue[1]}
                    onChange={(e) => {
                      if (volValueOption === 2) {
                        setVolValue([0, e.target.value]);
                      } else {
                        setVolValue([volValue[0], e.target.value]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Box>

          <Box sx={{ width: 190 }} className="mx-2">
            <p className="my-auto  fw-bolder">Oi Value</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
              }}
            >
              <div
                className={oiValueOption === 1 ? "active" : "deactive"}
                onClick={() => {
                  setOiValueOption(1);
                }}
              >
                Min
              </div>
              <div
                className={oiValueOption === 2 ? "active" : "deactive"}
                onClick={() => {
                  setOiValueOption(2);
                }}
              >
                Max
              </div>
              <div
                className={oiValueOption === 3 ? "active" : "deactive"}
                onClick={() => {
                  setOiValueOption(3);
                }}
              >
                Range
              </div>
            </div>
            <div className="d-flex flex-row my-1">
              {(oiValueOption === 1 || oiValueOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1 ">
                  <label>{oiValueOption === 1 ? "Min" : "From"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={oiValue[0]}
                    onChange={(e) => {
                      if (oiValueOption === 1) {
                        setoiValue([e.target.value, 100000000]);
                      } else {
                        setoiValue([e.target.value, oiValue[1]]);
                      }
                    }}
                  />
                </div>
              )}
              {(oiValueOption === 2 || oiValueOption === 3) && (
                <div className="d-flex flex-column align-items-start mx-1">
                  <label>{oiValueOption === 2 ? "Max" : "To"}</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    className="form-control "
                    value={oiValue[1]}
                    onChange={(e) => {
                      if (oiValueOption === 2) {
                        setoiValue([0, e.target.value]);
                      } else {
                        setoiValue([oiValue[0], e.target.value]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Box>

          <Box sx={{ width: 150 }} className="mx-2 ">
            <p className="my-auto  fw-bolder">ETF Filter</p>
            {/* <InputLabel id="demo-simple-select-label">Filter Days</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={erfFilter}
              label="Age"
              onChange={(e) => setHrfFilter(e.target.value)}
              sx={{ marginTop: 1, padding: 0 }}
            >
              <MenuItem value={true}>ETF</MenuItem>
              <MenuItem value={false}>Stock</MenuItem>
            </Select>
          </Box>

          <Box sx={{ width: 150 }} className="mx-2 ">
            <p className="my-auto  fw-bolder">Filter Days</p>
            {/* <InputLabel id="demo-simple-select-label">Filter Days</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterDays}
              label="Age"
              onChange={handleFilterDaysChange}
              sx={{ marginTop: 1, padding: 0 }}
            >
              <MenuItem value={"180"}>6 Months</MenuItem>
              <MenuItem value={"720"}>2 Years</MenuItem>
              <MenuItem value={"max"}>MAX</MenuItem>
            </Select>
          </Box>

          <button
            className="my_button my-auto w-auto"
            onClick={() => {
              handleSubmit(
                `{
                  "month":"${monthInput}",
                  "strike_percent":"${strikeInput}",
                  "date":"${date}",
                  "call_value":"${callRange[0]}_${callRange[1]}",
                  "put_value":"${putRange[0]}_${putRange[1]}",
                  "cp_value":"${CPRange[0]}_${CPRange[1]}",
                  "filter_days":"${filterDays}",
                  "erf":${erfFilter},
                  "close_value":"${closeValue[0]}_${closeValue[1]}",
                  "vol_value":"${volValue[0]}_${volValue[1]}",
                  "oi_value":"${oiValue[0]}_${oiValue[1]}"
                }`
              );
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Controls;

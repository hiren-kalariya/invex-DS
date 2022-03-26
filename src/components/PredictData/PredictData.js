import React, { useState } from 'react'
import { 
        Autocomplete,
        Box, MenuItem, 
        ButtonGroup, Select, 
        InputAdornment, OutlinedInput, 
        Button, FormControl,
        Snackbar, Alert, Grow,
        List, ListItem, ListItemText,
        Divider, TextField,
        Backdrop, CircularProgress,
        TableContainer, Table, TableHead,
        TableRow, TableCell, TableBody
} from '@mui/material';

import tickerData from "./TickerData";

import { makeStyles } from '@mui/styles';

import axios from "axios";
const PredictData = () => {

    const [ticker, setTicker] = useState("");
    const [percentage, setPercentage] = useState(0);
    const [filterDays, setFilterDays] = useState("180");

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
            color: "white"
        }
    });

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(ticker===""){
            setErrMsg("Please Fill Picker Field!");
            setOpen(true);
        }
        else if(percentage<0 || percentage>100){
            setErrMsg("Percentage Should between 0-100!");
            setOpen(true);
        }
        else{
            console.log(ticker);
            setOpenBackDrop(true);
            axios.post(
                process.env.REACT_APP_BASE_URL+"/predict_price", 
                {
                    "ticker": ticker,
                    "filter_days": filterDays,
                    "percentage": percentage
                }
            ).then(response => {
                console.log(response);
                setPredictData(response.data);
                setDataLoaded(true);
                setOpenBackDrop(false);
            })
            .catch(e => {
                console.log(e.response);
                setErrMsg("Something went wrong!");
                setOpen(true);
                setOpenBackDrop(false);
            });
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const selected = {
        color:"white", backgroundColor:"#0F062B",
        '&:hover':{ color:"white", backgroundColor:"#0F062B" }
    }

    const unSelected = { 
        '&:hover':{ color:"white", backgroundColor:"#0F062B" } 
    }

    const changeFloat = (data) => {
        return parseFloat(data).toFixed(2)
    }

    return (
        <div className='container' style={{padding: "50px 0 0"}}>
            <div className='offset-0 col-12'>
                <div style={{justifyContent:"space-around"}} className=' card d-flex flex-row flex-wrap w-100 p-4'>
                    <Box className='my-2 mx-2 '>
                        <p className='mb-1 my-auto mx-2 fw-bolder'>Ticker</p>
                        {/* <input
                            type='text'
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                            className='mx-2 form-control my-auto '
                        /> */}
                        
                        <FormControl sx={{ width: '25ch' }} variant="outlined">
                            <Autocomplete 
                                options={tickerData}
                                // inputValue={ticker}
                                onChange={(event, value) => setTicker(value)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Ticker"
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />
                            {/* <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={tickerData}
                                renderInput={(params) => <TextField {...params} onClick={e => console.log(e)} label="Ticker" />}
                            /> */}
                        </FormControl>
                    </Box>
                    <Box className='my-2 mx-2 '>
                        <p className='my-auto mx-2 fw-bolder'>Filter Days</p>
                        <Select
                            value={filterDays}
                            label="Age"
                            onChange={(e) => setFilterDays(e.target.value)}
                            sx={{marginTop:2, marginLeft:1, padding:0}}
                        >
                            <MenuItem value={180}>6 Months</MenuItem>
                            <MenuItem value={360}>1 Years</MenuItem>
                            <MenuItem value={720}>2 Year</MenuItem>
                            <MenuItem value={1800}>5 Year</MenuItem>
                        </Select>
                    </Box>
                    <Box className='my-2 mx-2 '>
                        <p className='mb-1 my-auto mx-2 fw-bolder'>Percentage</p>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                                type="number"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                                inputProps = { { max: 100, min: 0 } }
                            />
                        </FormControl>
                    </Box>
                    
                    <button
                        className='ml-3 px-4 my_button my-auto w-auto'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                {
                    dataLoaded
                    ?   <div style={{justifyContent:"space-around"}} className=' card d-flex flex-column flex-wrap align-items-center w-100 p-4 mt-4 mb-2'>
                            <ButtonGroup color="inherit" disableRipple sx={{ color:"#0F062B", borderColor:"#0F062B" }} >
                                <Button 
                                    sx={timePeriod==="5"?selected:unSelected} 
                                    onClick={() => setTimePeriod("5")}
                                >
                                    Weekly
                                </Button>
                                <Button 
                                    sx={timePeriod==="10"?selected:unSelected}  
                                    onClick={() => setTimePeriod("10")}
                                >
                                    Semi-Monthly
                                </Button>
                                <Button 
                                    sx={timePeriod==="20"?selected:unSelected}  
                                    onClick={() => setTimePeriod("20")}
                                >
                                    Monthly
                                </Button>
                                <Button 
                                    sx={timePeriod==="60"?selected:unSelected}  
                                    onClick={() => setTimePeriod("60")}
                                >
                                    Quaterly
                                </Button>
                            </ButtonGroup>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: "fitContent",
                                    bgcolor: 'background.paper',
                                    border: "1px solid #0F062B",
                                    borderRadius: "5px",
                                    marginTop:"1rem",
                                }}
                            >
                                <ListItem>
                                    <ListItemText 
                                        primary="O to H Volatility" 
                                        secondary={ changeFloat(predictData[timePeriod]["O to H"]) + "%"} 
                                        classes={{ primary: classes.text }}
                                    />
                                    <Divider orientation="vertical" variant="middle" flexItem />
                                    <ListItemText 
                                        primary="O to L Volatility" 
                                        secondary={ changeFloat(predictData[timePeriod]["O to L"]) + "%"} 
                                        classes={{ primary: classes.text }}
                                    />
                                </ListItem>
                                {/* <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Predicted High" 
                                        secondary={changeFloat(predictData[timePeriod]["predicted_high"])} />
                                    <ListItemText 
                                        primary="Predicted Low" 
                                        secondary={changeFloat(predictData[timePeriod]["predicted_low"])} />
                                </ListItem> */}

                                <Divider />

                                <div style={{flex: "1 1 auto", margin:"2em",overflowX: "scroll"}}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" ></TableCell>
                                                {
                                                    predictData[timePeriod]["percentage"].map((data, index) => {
                                                        return(
                                                            <TableCell className={index===0?classes.specialCell:""} align="center"> 
                                                                <b>{data}%</b> 
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center"> <b>Predicted High</b> </TableCell>
                                                {
                                                    predictData[timePeriod]["predicted_high"].map((data, index) => {
                                                        console.log(data)
                                                        return(<TableCell className={index===0?classes.specialCell:""} align="center"> $ {changeFloat(data)} <div style={{fontSize: "10px"}}>( {changeFloat(predictData[timePeriod]["OtoHpercent"][index])}% ) </div> </TableCell>)
                                                    })
                                                }
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center"> <b>Predicted Low</b> </TableCell>
                                                {
                                                    predictData[timePeriod]["predicted_low"].map((data, index) => {
                                                        return(<TableCell className={index===0?classes.specialCell:""} align="center"> $ {changeFloat(data)} <div style={{fontSize: "10px"}}> ( {changeFloat(predictData[timePeriod]["OtoLpercent"][index])}% )</div> </TableCell>)
                                                    })
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>

                                <Divider />
                                
                                <ListItem style={{flexWrap:"wrap"}}>
                                    <div style={{flex: "1 1 auto", marginRight:"2em"}}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={2}> <b>1st SD</b> </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center"> {changeFloat(predictData[timePeriod]["first_percent"][0])}% </TableCell>
                                                    <TableCell align="center"> $ {changeFloat(predictData[timePeriod]["first"][0])} </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center"> {changeFloat(predictData[timePeriod]["first_percent"][1])}% </TableCell>
                                                    <TableCell align="center"> $ {changeFloat(predictData[timePeriod]["first"][1])} </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div style={{flex: "1 1 auto", marginRight:"2em"}}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={2}> <b>2nd SD</b> </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center"> {changeFloat(predictData[timePeriod]["second_percent"][0])}% </TableCell>
                                                    <TableCell align="center"> $ {changeFloat(predictData[timePeriod]["second"][0])} </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center"> {changeFloat(predictData[timePeriod]["second_percent"][1])}% </TableCell>
                                                    <TableCell align="center"> $ {changeFloat(predictData[timePeriod]["second"][1])} </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div style={{flex: "1 1 auto"}}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={2}> <b>3rd SD</b> </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center"> {changeFloat(predictData[timePeriod]["third_percent"][0])}% </TableCell>
                                                    <TableCell align="center"> $ {changeFloat(predictData[timePeriod]["third"][0])} </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center"> {changeFloat(predictData[timePeriod]["third_percent"][1])}% </TableCell>
                                                    <TableCell align="center"> $ {changeFloat(predictData[timePeriod]["third"][1])} </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </ListItem>
                            </List>
                        </div>
                    :<></>
                }
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Snackbar 
                open={open} 
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
                autoHideDuration={2000} 
                onClose={handleClose}
                TransitionComponent={ Grow }
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errMsg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default PredictData
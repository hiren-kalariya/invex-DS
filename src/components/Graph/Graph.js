import React, { useEffect, useState } from 'react';
import { Box, MenuItem, TextField, Select, useTheme, OutlinedInput, Chip, FormControl, InputLabel } from '@mui/material'
import axios from 'axios';
import CustomChart from './CustomChart.js';

import _without from "lodash/without";
import CancelIcon from "@material-ui/icons/Cancel";


const Graph = () => {

    const theme = useTheme();

    const [filterCompanyType, setFilterCompanyType] = useState("sell");

    const defSelected = "All"
    const [selectedCompanyName, setSelectedCompanyName] = useState([defSelected]);
    
    const [graphData, setGraphData] = useState({});
    const [companyNameData, setCompanyNameData] = useState([]);
    // const [graphMidData, setGraphMidData] = useState({});
    const [colors, setColors] = useState([]);
    
    const [chartLables, setChartLables] = useState([]);
    const [dataSets, setDataSets] = useState([]);
    const [dataSetsChange, setDataSetsChange] = useState([]);

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
            fontWeight: "bold"
          },
        },
    };

    function getStyles(name, comName, theme) {
        return {
            fontWeight:
            comName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        };
    }

    useEffect(() => {
        axios.get("https://dharm.ga/hello/graph")
        .then(response => {
            const data = response.data;
            const localCompName = Object.keys(data["sell"]);
            
            let localColors = {};
            localCompName.forEach( (lable) => {
                let r = Math.floor(Math.random()*255);
                let g = Math.floor(Math.random()*255);
                let b = Math.floor(Math.random()*255);
                localColors[lable] = {r,g,b}
            });
            setColors(localColors);

            setCompanyNameData(localCompName);
            setChartLables(data["sell"][localCompName[0]].expiration);
            setGraphData(data);
        })
        .catch(err => {
            alert("Some Error Occured !");
            console.log(err);
        });
    }, []);

    useEffect(() => {
        let lables = companyNameData;
        let n = lables.length;
        let localDataSet = [];
        let localDataSetChange = [];
        if(graphData.sell){
            if(selectedCompanyName.indexOf(defSelected)!==-1){
                for(let i=0; i<n; i++){
                    localDataSet.push({
                        label: lables[i],
                        data: graphData[filterCompanyType][lables[i]].mid,
                        borderColor: "rgb("+colors[lables[i]].r+","+colors[lables[i]].g+","+colors[lables[i]].b+")",
                        backgroundColor: "rgba(" + colors[lables[i]].r + "," + colors[lables[i]].g + "," + colors[lables[i]].b + ", 0.5)"
                    });
                    localDataSetChange.push({
                        label: lables[i]+" Change %",
                        data: graphData[filterCompanyType][lables[i]].mid_change,
                        borderColor: "rgb("+colors[lables[i]].r+","+colors[lables[i]].g+","+colors[lables[i]].b+")",
                        backgroundColor: "rgba(" + colors[lables[i]].r + "," + colors[lables[i]].g + "," + colors[lables[i]].b + ", 0.5)"
                    });
                }
            }
            else {
                selectedCompanyName.forEach( (comName)=>{
                    localDataSet.push({
                        label: comName,
                        data: graphData[filterCompanyType][comName].mid,
                        borderColor: "rgb("+colors[comName].r+","+colors[comName].g+","+colors[comName].b+")",
                        backgroundColor: "rgba(" + colors[comName].r + "," + colors[comName].g + "," + colors[comName].b + ", 0.5)"
                    });
                    localDataSetChange.push({
                        label: comName+" Change %",
                        data: graphData[filterCompanyType][comName].mid_change,
                        borderColor: "rgb("+colors[comName].r+","+colors[comName].g+","+colors[comName].b+")",
                        backgroundColor: "rgba(" + colors[comName].r + "," + colors[comName].g + "," + colors[comName].b + ", 0.5)"
                    });
                });
            }
        }
        setDataSets(localDataSet);
        setDataSetsChange(localDataSetChange)
    }, [colors, companyNameData, graphData, selectedCompanyName, filterCompanyType]);
    
    const handleDataTypeChange = (e) => {
        const newValue = e.target.value;
        let localCompName = Object.keys(graphData[newValue]);

        setFilterCompanyType(newValue);
        setSelectedCompanyName([defSelected]);

        let localColors = {};
        localCompName.forEach( (lable) => {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            localColors[lable] = {r,g,b}
        });
        setColors(localColors);

        setCompanyNameData(localCompName);
        setChartLables(graphData[newValue][localCompName[0]].expiration);
    }

    const handleNameChange = (e) => {
        const {
            target: { value },
        } = e;
        setSelectedCompanyName(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleChipDelete = (e, value) => {
        e.preventDefault();
        setSelectedCompanyName((current) => _without(current, value));
    }

    return (
        <div className='container' style={{padding: "50px 0 0"}}>
            <div className='offset-0 col-12'>
                <div style={{justifyContent:"space-around"}} className=' card d-flex flex-row flex-wrap align-items-center w-100 p-4'>
                    <Box sx={{ width: 150 }} className='mx-2 '>
                        <p className='my-auto mx-2 fw-bolder'>Data Type</p>
                        <TextField
                            value={filterCompanyType}
                            onChange={handleDataTypeChange}
                            select
                            sx={{marginTop:1, padding:0, width:"100%"}}
                        >
                                <MenuItem value="sell">Sell</MenuItem>
                                <MenuItem value="buy">Buy</MenuItem>
                        </TextField>
                    </Box>

                    <Box className='mx-2 '>
                        <p className='my-auto mx-2 fw-bolder'>Company Name</p>
                        <FormControl sx={{ m: 1, width: 500 }}>
                            <InputLabel id="company">Company</InputLabel>
                            <Select
                                labelId="company"
                                value={selectedCompanyName}
                                onChange={handleNameChange}
                                multiple
                                input={<OutlinedInput id="company" label="Company" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip 
                                                key={value} 
                                                label={value} 
                                                onDelete={(e) => handleChipDelete(e, value)}
                                                sx = {{ color:"white", backgroundColor:"#0f062b" }}
                                                deleteIcon={
                                                    <CancelIcon
                                                        style={{fill:"white"}}
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                    />
                                                }
                                            />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                <MenuItem
                                    value={ defSelected }
                                    style={getStyles(defSelected, selectedCompanyName, theme)}
                                >
                                    { defSelected }
                                </MenuItem>
                                {
                                    companyNameData.map(name => {
                                        return (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, selectedCompanyName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    {/* <button
                        className='my_button my-auto w-auto'
                        onClick={() => alert(JSON.stringify({"Data": filterCompanyType, "Company": filterCompanyName}))}
                    >
                        Submit
                    </button> */}
                </div>
            </div>
            <CustomChart title="Invex Chart" chartLables={chartLables} dataSets={dataSets} />
            <CustomChart title="Invex Chart Change %" chartLables={chartLables} dataSets={dataSetsChange} />
        </div>
    );
};

export default Graph;

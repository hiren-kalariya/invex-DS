import React, { useEffect, useState } from 'react';
import { Box, MenuItem, TextField, Select } from '@mui/material'
import axios from 'axios';
import CustomChart from './CustomChart';


const Graph = () => {

    const [filterCompanyType, setFilterCompanyType] = useState("lower_data");
    const [filterCompanyName, setFilterCompanyName] = useState("def");
    
    const [graphData, setGraphData] = useState({});
    const [companyNameData, setCompanyNameData] = useState([]);
    const [graphMidData, setGraphMidData] = useState({});
    const [colors, setColors] = useState([]);
    
    const [chartLables, setChartLables] = useState([]);
    const [dataSets, setDataSets] = useState([]);

    useEffect(() => {
        axios.get("https://dharm.ga/hello/graph")
        .then(response => {
            const data = response.data;
            
            let localColors = {};
            Object.keys(data[filterCompanyType].heading).forEach( (lable) => {
                let r = Math.floor(Math.random()*255);
                let g = Math.floor(Math.random()*255);
                let b = Math.floor(Math.random()*255);
                localColors[lable] = {r,g,b}
            });
            setColors(localColors);

            setCompanyNameData(Object.keys(data[filterCompanyType].heading));
            setGraphMidData(data[filterCompanyType].mid);
            setChartLables(data[filterCompanyType].dates);
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
        if(filterCompanyName==="def"){
            for(let i=0; i<n; i++){
                localDataSet.push({
                    label: lables[i],
                    data: graphMidData[lables[i]],
                    borderColor: "rgb("+colors[lables[i]].r+","+colors[lables[i]].g+","+colors[lables[i]].b+")",
                    backgroundColor: "rgba(" + colors[lables[i]].r + "," + colors[lables[i]].g + "," + colors[lables[i]].b + ", 0.5)"
                })
            }
        }
        else {
            localDataSet.push({
                label: filterCompanyName,
                data: graphMidData[filterCompanyName],
                borderColor: "rgb("+colors[filterCompanyName].r+","+colors[filterCompanyName].g+","+colors[filterCompanyName].b+")",
                backgroundColor: "rgba(" + colors[filterCompanyName].r + "," + colors[filterCompanyName].g + "," + colors[filterCompanyName].b + ", 0.5)"
            })
        }
        setDataSets(localDataSet);
    }, [colors, companyNameData, graphMidData, filterCompanyName, filterCompanyType]);
    

    const handleDataTypeChange = (e) => {
        setFilterCompanyType(e.target.value);
        setFilterCompanyName("def");

        let localColors = {};
        Object.keys(graphData[e.target.value].heading).forEach( (lable) => {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            localColors[lable] = {r,g,b}
        });
        setColors(localColors);

        setCompanyNameData(Object.keys(graphData[e.target.value].heading));
        setGraphMidData(graphData[e.target.value].mid);
        setChartLables(graphData[e.target.value].dates);
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
                                <MenuItem value="lower_data">Lower Data</MenuItem>
                                <MenuItem value="upper_data">Upper Data</MenuItem>
                        </TextField>
                    </Box>

                    <Box sx={{ width: 150 }} className='mx-2 '>
                        <p className='my-auto mx-2 fw-bolder'>Company Name</p>
                        <Select
                            value={filterCompanyName}
                            onChange={(e) => setFilterCompanyName(e.target.value)}
                            sx={{marginTop:1, padding:0, width:"100%"}}
                            MenuProps={{ sx:{maxHeight: 300} }}
                        >
                                <MenuItem value={"def"}>-- Select --</MenuItem>
                                {
                                    companyNameData.map(data => {
                                        return (
                                            <MenuItem key={data} value={data}>{data}</MenuItem>
                                        )
                                    })
                                }
                        </Select>
                    </Box>

                    {/* <button
                        className='my_button my-auto w-auto'
                        onClick={() => alert(JSON.stringify({"Data": filterCompanyType, "Company": filterCompanyName}))}
                    >
                        Submit
                    </button> */}
                </div>
            </div>
            <CustomChart chartLables={chartLables} dataSets={dataSets} />
        </div>
    );
};

export default Graph;

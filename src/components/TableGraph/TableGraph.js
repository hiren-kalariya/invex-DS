import { Box, CircularProgress, createTheme, Dialog, MenuItem, Modal, responsiveFontSizes, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/styles'
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import CustomChartMAxis from '../Graph/CustomChartMAxis';

const TableGraph = () => {

    const [filterCompanyType, setFilterCompanyType] = useState("sell");
    const [companieData, setCompanieData] = useState([]);

    const [showChart, setShowChart] = useState(false);
    const [chartLables, setChartLables] = useState([]);
    const [dataSets, setDataSets] = useState([]);

    const [graphData, setGraphData] = useState({});

    const [circularProgress, setCircularProgress] = useState(false);

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const columns = [
        { name: 'option_symbol', label: 'Option Symbol' },
        { 
            name: 'invex_ration', 
            label: 'Invex Ration',
            options: {
                sortCompare: (order) => {
                  return (obj1, obj2) => {
                    let val1 = parseInt(obj1.data, 10);
                    let val2 = parseInt(obj2.data, 10);
                    return (val1 - val2) * (order === 'asc' ? 1 : -1);
                  };
                }
            }
        },
        { name: 'date_of_expiration', label: 'Date Of Expiration' },
        { name: 'type', label: 'Type' },
        { name: 'last_percentage_change', label: 'Last Percentage Change' },
        { name: 'action', label: 'See More' }
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
    };

    useEffect(() => {
        setCircularProgress(true);
        axios.get(process.env.REACT_APP_BASE_URL+"/graph")
        .then(response => {
            const data = response.data;
            console.log(data);
            
            let localColors = {};
            Object.keys(data["sell"]).forEach( (lable) => {
                let r = Math.floor(Math.random()*255);
                let g = Math.floor(Math.random()*255);
                let b = Math.floor(Math.random()*255);

                let r1 = Math.floor(Math.random()*255);
                let g1 = Math.floor(Math.random()*255);
                let b1 = Math.floor(Math.random()*255);

                localColors[lable] = {r,g,b,r1,g1,b1}
            });

            const localData = [];
            Object.keys(data["sell"]).forEach( name => {
                localData.push({
                    option_symbol: data["sell"][name].table[0][0],
                    invex_ration: Number(data["sell"][name].table[0][1]).toPrecision(),
                    date_of_expiration: data["sell"][name].table[0][2],
                    type: data["sell"][name].table[0][3],
                    last_percentage_change: data["sell"][name].table[0][4],
                    action: (
                        <button
                            className='btn btn-outline-success'
                            onClick={() => {
                                setShowChart(true);
                                setChartLables(data[filterCompanyType][name].expiration);
                                setDataSets([
                                    {
                                        label: name,
                                        data: data[filterCompanyType][name].mid,
                                        borderColor: "rgb("+localColors[name].r+","+localColors[name].g+","+localColors[name].b+")",
                                        backgroundColor: "rgba(" + localColors[name].r + "," + localColors[name].g + "," + localColors[name].b + ", 0.5)",
                                        yAxisID: 'y'
                                    },
                                    {
                                        label: name + " Change %",
                                        data: data[filterCompanyType][name].mid_change,
                                        borderColor: "rgb("+localColors[name].r1+","+localColors[name].g1+","+localColors[name].b1+")",
                                        backgroundColor: "rgba(" + localColors[name].r1 + "," + localColors[name].g1 + "," + localColors[name].b1 + ", 0.5)",
                                        yAxisID: 'y1'
                                    }
                                ]);
                            }}
                        >
                            <i className='fa fa-arrow-right' aria-hidden='true'></i>
                        </button>
                    )
                })
            });
            setCompanieData(localData);

            setGraphData(data);
            setCircularProgress(false);
        })
        .catch(err => {
            alert("Some Error Occured !");
            console.log(err);
        });
    }, []);

    const handleDataTypeChange = (e) => {
        const newValue = e.target.value;

        setFilterCompanyType(newValue);

        let localColors = {};
        Object.keys(graphData[newValue]).forEach( (lable) => {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            
            let r1 = Math.floor(Math.random()*255);
            let g1 = Math.floor(Math.random()*255);
            let b1 = Math.floor(Math.random()*255);

            localColors[lable] = {r,g,b,r1,g1,b1}
        });

        const localData = [];
        Object.keys(graphData[newValue]).forEach( name => {
            localData.push({
                option_symbol: graphData[newValue][name].table[0][0],
                invex_ration: graphData[newValue][name].table[0][1],
                date_of_expiration: graphData[newValue][name].table[0][2],
                type: graphData[newValue][name].table[0][3],
                last_percentage_change: graphData[newValue][name].table[0][4],
                action: (
                    <button
                        className='btn btn-outline-success'
                        onClick={() => {
                            setShowChart(true);
                            setChartLables(graphData[newValue][name].expiration);
                            setDataSets([
                                {
                                    label: name,
                                    data: graphData[newValue][name].mid,
                                    borderColor: "rgb("+localColors[name].r+","+localColors[name].g+","+localColors[name].b+")",
                                    backgroundColor: "rgba(" + localColors[name].r + "," + localColors[name].g + "," + localColors[name].b + ", 0.5)",
                                    yAxisID: 'y'
                                },
                                {
                                    label: name + " Change %",
                                    data: graphData[newValue][name].mid_change,
                                    borderColor: "rgb("+localColors[name].r1+","+localColors[name].g1+","+localColors[name].b1+")",
                                    backgroundColor: "rgba(" + localColors[name].r1 + "," + localColors[name].g1 + "," + localColors[name].b1 + ", 0.5)",
                                    yAxisID: 'y1'
                                }
                            ]);
                        }}
                    >
                        <i className='fa fa-arrow-right' aria-hidden='true'></i>
                    </button>
                )
            })
        });
        setCompanieData(localData);

    }

    const handleCloseModal = () => {
        setShowChart(false);
    }

    return (
        <>
            <div className='container' style={{padding: "50px 0 50px"}}>
                <div className='offset-0 col-12'>
                    <div style={{justifyContent:"space-around"}} className=' card d-flex flex-column flex-wrap align-items-center w-100 p-4'>
                        <Box sx={{ width: 150 }} className='mx-2 mb-4'>
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
                        
                        <ThemeProvider theme={theme}>
                            <MUIDataTable
                                data={companieData}
                                columns={columns}
                                options={{ selectableRows: false }}
                                className='my-2'
                            />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            <Modal
                open={showChart} aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description' style={{ overflow: 'scroll' }}
            >
            <div>
                <Box sx={{ ...style, width: 800 }}>
                    <div className='text-end' style={{ cursor: 'pointer' }}>
                        <i className='fas fa-times' onClick={handleCloseModal}></i>
                    </div>

                        <CustomChartMAxis
                            chartLables={chartLables} 
                            dataSets={dataSets}
                        />

                    <div>
                        <button onClick={handleCloseModal} className='mt-2 btn btn-danger'> Close </button>
                    </div>
                </Box>
            </div>
            </Modal>
            <Dialog
               open={circularProgress}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
               PaperProps={{
                  style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                  },
               }}
            >
               <Box sx={{padding:1, background:"transparent", display:"flex"}}>
                  <CircularProgress sx={{color:"white", margin:"0 auto "}} /> 
               </Box>     
            </Dialog>
        </>
    );
};

export default TableGraph;

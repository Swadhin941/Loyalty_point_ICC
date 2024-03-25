import React, { useContext, useEffect, useState } from 'react';
import "./Home.css";
import Papa from "papaparse";
import { SharedData } from '../SharedData/SharedContext';
import { useNavigate } from 'react-router-dom';
import exportFromJSON from 'export-from-json';
import ClockLoader from "react-spinners/ClockLoader";
import toast from 'react-hot-toast';

const Home = () => {
    document.title="Loyalty point for ICC";
    const { csvData1, setCSVData1, setCSVData2, setCSVData3, csvData2, csvData3 } = useContext(SharedData);
    const navigate = useNavigate();
    const [testCsv, setTestCsv] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [earnedPointData, setEarnedPointData]= useState(null);
    const [dealFromHubspot, setDealFromHubspot]= useState(null);

    const handleDealCSV = (e) => {
        setDealFromHubspot(e.target.files[0]);
        
    }

    const earnedPointChange = e => {
        setEarnedPointData(e.target.files[0])
        
    }

    useEffect(()=>{
        if(dealFromHubspot && earnedPointData){
            Papa.parse(earnedPointData, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    // console.log(result);
                    let tempColumns = [];
                    let tempValues = [];
                    result.data.forEach(data => {
                        tempColumns.push(Object.keys(data));
                        tempValues.push(Object.values(data));
                    })
                    // console.log(tempColumns[0]);
                    setCSVData1({
                        csvData: result.data,
                        columns: tempColumns[0],
                        values: tempValues
                    });
                }
            })
            Papa.parse(dealFromHubspot, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    // console.log(result);
                    let tempColumns = [];
                    let tempValues = [];
                    result.data.forEach(data => {
                        tempColumns.push(Object.keys(data));
                        tempValues.push(Object.values(data));
                    })
                    // console.log(tempColumns[0]);
                    // console.log(result.data);
                    setCSVData2({
                        csvData: result.data,
                        columns: tempColumns[0],
                        values: tempValues
                    });
                }
            })
        }
    },[dealFromHubspot, earnedPointData])

    const handleClick = () => {
        if(!csvData2){
            toast.error("Please click again after 20 sec");
            return;
        }
        setDataLoading(true);
        // console.log(csvData1, csvData2);
        const tempEarnedArray = [...csvData1?.csvData];
        const tempDealArray = [...csvData2?.csvData];
        const printCSV = [];
        const combineDatas= tempEarnedArray.reduce((acc, obj1)=>{
            const findMatch = tempDealArray.find(obj2=> obj2["Deal owner"].split('-')[0].trim() === obj1["Order Number"])
            if(findMatch){
                printCSV.push({
                    "Record ID": parseInt(findMatch["Record ID"]),
                    "Order Number": parseInt(obj1["Order Number"]),
                    "Points Left": parseFloat(obj1["Points Left"]),
                    "Points Earned": parseFloat(obj1["Points Earned"]),
                    "Expiration Date": obj1["Expiration Date"]
                })
                const combineObject = {...obj1, ...findMatch}
                acc.push(combineObject);
            }
            return acc;
        },[])

        const filename = "Final"
        const exportType = exportFromJSON.types.csv;

        exportFromJSON({ data: printCSV, fileName: filename, exportType });
        setDataLoading(false);
    }

    return (
        <div className='container-fluid' style={{ height: "100vh" }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-center mt-3">
                    <div className='d-flex justify-content-between p-2' style={{ width: "45%", border: "1px solid black", borderRadius: "5px" }}>
                        <h5 className='mt-1'>{earnedPointData ? earnedPointData?.name : "Add Earned Point file"}</h5><div className='p-1 ms-1'>
                            <i className='bi bi-plus-square fs-5' style={{ cursor: "pointer" }} onClick={()=>document.querySelector("#earnedCsv").click()}></i>
                        </div>
                        <input type="file" accept='csv' name='earnedCsv' id='earnedCsv' onChange={earnedPointChange} hidden/>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-center mt-3">
                    <div className='d-flex justify-content-between p-2' style={{ width: "45%", border: "1px solid black", borderRadius: "5px" }}>
                        <h5 className='mt-1'>{dealFromHubspot ? dealFromHubspot?.name : "Add Deal CSV from hubspot"}</h5><div className='p-1 ms-1'>
                            <i className='bi bi-plus-square fs-5' style={{ cursor: "pointer" }} onClick={()=>document.querySelector('#dealHubspot').click()}></i>
                        </div>
                        <input type="file" accept='csv' name='dealHubspot' id='dealHubspot' onChange={handleDealCSV} hidden />
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-center mt-3">
                    <button className='btn btn-primary w-25 d-flex justify-content-center' onClick={handleClick} disabled={!csvData2 || dataLoading}>{dataLoading ? <ClockLoader size={24} color='white' /> : "Make and Download CSV"}</button>
                </div>


            </div>
        </div>
    );
};

export default Home;
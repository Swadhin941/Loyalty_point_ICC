import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import { CSVLink } from "react-csv";
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const { csvData1, csvData2, csvData3 } = useContext(SharedData);
    // console.log(csvData2);
    const navigate = useNavigate();

    useEffect(() => {
        if (!csvData1 && !csvData2 && !csvData3) {
            navigate('/');
        }
    }, [csvData1, csvData2, csvData3])

    const tempUsedPoint = [...csvData2?.csvData];
    const tempEarnedPoint = [...csvData3?.csvData];
    // console.log(tempEarnedPoint, tempUsedPoint);
    const firstCombinedArray = tempEarnedPoint.reduce((acc, obj1) => {
        const matchFind = tempUsedPoint.find(obj2 => parseInt(obj2["Order Number"]) === parseInt(obj1["Order Number"]));
        if (matchFind) {
            const combineObj = { ...obj1, ...matchFind };
            acc.push(combineObj);
        }
        return acc;
    }, [])
    console.log(firstCombinedArray);
    // const [storeCSV, setStoreCSV]= useState([]);
    // const temp= [...csvData1?.csvData];
    // console.log(temp);
    // const temp2= [];
    // temp.forEach(element=>{
    //     if(element["Order Number"]!==''){
    //         temp2.push({"Order Number": parseInt(element["Order Number"])})
    //     }
    // })
    // console.log(temp2);
    // console.log(csvData);
    // const handleClick= ()=>{
    //     const tempCSV = [...csvData];
    //     tempCSV.forEach(element=>{
    //         if(element['Industry ']===''){
    //             delete element['Industry '];
    //         }
    //     });
    //     console.log(tempCSV);
    // }
    return (
        <div className='container-fluid'>
            <h1>CSV details</h1>


        </div>
    );
};

export default Details;
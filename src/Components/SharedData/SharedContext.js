import React, { createContext, useState } from 'react';

export const SharedData = createContext();

const SharedContext = ({ children }) => {
    const [csvData1, setCSVData1] = useState(null);
    const [csvData2, setCSVData2] = useState(null);
    const [csvData3, setCSVData3] = useState(null);

    const authInfo = { csvData1, setCSVData1, csvData2, setCSVData2, csvData3, setCSVData3 };
    return (
        <div>
            <SharedData.Provider value={authInfo}>
                {children}
            </SharedData.Provider>
        </div>
    );
};

export default SharedContext;
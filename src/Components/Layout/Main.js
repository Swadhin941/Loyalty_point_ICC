import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='container-fluid' style={{ backgroundColor: "#fffbd1" }}>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Main;
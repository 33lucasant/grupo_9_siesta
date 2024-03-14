import React from 'react';
import ChartRow from './ChartRow';
import { useState, useEffect } from 'react';


function Chart () {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data.data)
            })
            .catch(error => console.log(error))
    }, [])

    let tableRowsData = users;

    console.log(tableRowsData);

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th className='avatar-th'>Avatar</th>                               
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            tableRowsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;
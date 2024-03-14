import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.id}</td>
                    <td><img className='avatar' src={`http://localhost:3001/img/avatars/${props.avatar}`}/></td>
                    <td>{props.first_name}</td>
                    <td>{props.last_name}</td>
                    <td>{props.email}</td>
                </tr>
            )
    }
    
        

export default ChartRow;
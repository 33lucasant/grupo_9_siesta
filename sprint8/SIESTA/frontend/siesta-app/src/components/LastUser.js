import React from 'react';
import { useState, useEffect } from 'react';

function LastUser() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/users/lastUser`)
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <React.Fragment>
             <div className='lastUser-container'>
                <h3>Ultimo usuario</h3>
                <React.Fragment>
                    <div className='last-user-card'>
                        <img src={`http://localhost:3001/img/avatars/${user.avatar}`}/>
                    
                        <div className='lastUser-description'>
                            <div className='description-div'>
                                <p>{user.first_name + ' ' + user.last_name}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        </div>
                </React.Fragment>
            </div>
        </React.Fragment>            
    )
}

export default LastUser;
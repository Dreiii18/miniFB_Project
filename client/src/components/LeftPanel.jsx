import React, { useEffect, useState } from 'react'
import ImageLayout from './ImageLayout'
import "./LeftPanel.css"
import groups from '../../images/groups.png'
import messenger from '../../images/messenger.png'

function LeftPanel() {
    const [data, setData] = useState([]);
    const account = JSON.parse(localStorage.getItem('userData'));

    useEffect( () => {
        const getData = () => {
            const newData = [
                {
                    "image": account.profilePicture,
                    "text": "Andrei Artap",
                },
                {
                    "image": groups,
                    "text": "Friends",
                },
                {
                    "image": messenger,
                    "text": "Messenger"
                },
            ];
            setData(newData);
        }
        getData();
    }, []);


    return (
        <div>
            {data.map( (item) => (
                <ImageLayout image={item.image} text={item.text} />
            ))}
        </div>
    )
}

export default LeftPanel
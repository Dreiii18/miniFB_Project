import React from 'react'
import Avatar from '@mui/material/Avatar';
import './ImageLayout.css'

function ImageLayout(props) {
    return (
        <div>
            <div className='imageLayout_container'>
                <div className="imageLayout_imgdiv">
                    <Avatar className='imageLayout_img' src={props.image}/>
                </div>
                <div className='imageLayout_text'>
                    {props.text}
                </div>
            </div>
        </div>
    )
}

export default ImageLayout
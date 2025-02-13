import React, { useState } from 'react'
import Alert from "react-bootstrap/Alert"
export default function Notify(props) {
    const [show,setshow]=useState(true);
    return (
        <Alert show={show} variant={props.variant} dismissible onClose={()=>{ setshow(false)}}>
            <Alert.Heading>
                {props.msg}
            </Alert.Heading>
            <p>{props.msg}</p>
        </Alert>
    )
}

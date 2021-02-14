import { Typography, Box, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


interface ILoginProps{
    setAppbar:{
        leftIcon:(icon:JSX.Element) => void,
        centerTitle:(title:string) => void;
        rightIcon:(icon:JSX.Element) => void;
    };
}


export default function Login(props:ILoginProps) {


    let history = useHistory();


    const [loginID,sLoginID] = useState("");
    const [passwd,sPasswd] = useState("");


    let loginButtonHandle = () => {
        localStorage.setItem("uid",loginID);
        history.push("/coupon");
    };


    useEffect(()=>{
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("ログイン");
        props.setAppbar.rightIcon(<></>);
    },[]);


    return (
        <Box style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box style={{
                width: "80vw",
                height: "80vw",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #919191",
                borderRadius: "10px",
                padding: "20px",
                margin: "20px"
            }}>
                <div style={{ flexGrow: 1 }}/>
                <Typography variant="h5" align="center" style={{ flexGrow: 2 }}>
                    ログイン
                </Typography>
                <TextField value={loginID} onChange={event=>{sLoginID(event.target.value)}} variant="filled" placeholder="ログインID" label="ログインID" style={{ flexGrow: 2 }} />
                <TextField value={passwd} onChange={event=>{sPasswd(event.target.value)}} variant="filled" placeholder="パスワード" label="パスワード" type="password" style={{ flexGrow: 2 }} />
                <Button onClick={loginButtonHandle} variant="contained" color="primary">ログイン</Button>
                <div style={{ flexGrow: 1 }}/>
            </Box>
        </Box>
    );
}
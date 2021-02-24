import { Typography, Box, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


interface IFetchedData{
    SID:string;
    message:string;
}


interface INewUserRegistrationProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function NewUserRegistration(props: INewUserRegistrationProps) {


    let history = useHistory();


    const [loginID, sLoginID] = useState("");
    const [passwd, sPasswd] = useState("");


    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("新規登録");
        props.setAppbar.rightIcon(<></>);
    }, []);


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
                <div style={{ flexGrow: 1 }} />
                <Typography variant="h5" align="center" style={{ flexGrow: 2 }}>
                    新規登録
                </Typography>
                <TextField value={loginID} onChange={event => { sLoginID(event.target.value) }} variant="filled" placeholder="ログインID" label="ログインID" style={{ flexGrow: 2 }} />
                <TextField value={passwd} onChange={event => { sPasswd(event.target.value) }} variant="filled" placeholder="パスワード" label="パスワード" type="password" style={{ flexGrow: 2 }} />
                <Button variant="contained" color="primary" onClick={async () => {
                    const userInfo = { "login_id": loginID, "password": passwd };
                    let isLogined = false;
                    let isResOk = false;
                    //登録
                    await fetch("http://192.168.1.49:3030/user", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userInfo),
                    })
                    .then(res => {
                        isResOk = res.ok;
                        return res;
                    })
                    .then(res => res.json())
                    .then((data:IFetchedData) =>{
                        if(!isResOk) throw new Error(data.message);
                    })
                    .catch((reason)=>{
                        console.log(reason);
                    });
                    //ログイン
                    await fetch("http://192.168.1.49:3030/login", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userInfo),
                    })
                    .then(res => {
                        isResOk = res.ok;
                        return res;
                    })
                    .then(res => res.json())
                    .then((data:IFetchedData) =>{
                        if(!isResOk) throw new Error(data.message);
                        localStorage.setItem("sid", data.SID);
                        isLogined = true;
                    })
                    .catch((reason)=>{
                        console.log(reason);
                    });
                    if(isLogined) history.push("/coupon");
                }}>登録</Button>
                <div style={{ flexGrow: 1 }} />
            </Box>
        </Box>
    );
}
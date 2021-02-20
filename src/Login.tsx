import { Typography, Box, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


interface IFetchedData {
    SID: string;
    message: string;
}
interface ILoginProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function Login(props: ILoginProps) {


    let history = useHistory();


    const [loginID, sLoginID] = useState("");
    const [passwd, sPasswd] = useState("");


    let loginButtonHandle = async () => {
        const userInfo = { "login_id": loginID, "password": passwd };
        let isLogined = false;
        let isResOk = false;
        //ログイン
        await fetch("http://localhost:3030/login", {
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
            .then((data: IFetchedData) => {
                if(!isResOk) throw new Error(data.message);
                localStorage.setItem("sid", data.SID);
                isLogined = true;
            })
            .catch((reason) => {
                console.log(reason);
            });
        if (isLogined) history.push("/coupon");
    };


    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("ログイン");
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
                    ログイン
                </Typography>
                <TextField value={loginID} onChange={event => { sLoginID(event.target.value) }} variant="filled" placeholder="ログインID" label="ログインID" style={{ flexGrow: 2 }} />
                <TextField value={passwd} onChange={event => { sPasswd(event.target.value) }} variant="filled" placeholder="パスワード" label="パスワード" type="password" style={{ flexGrow: 2 }} />
                <Button onClick={loginButtonHandle} variant="contained" color="primary">ログイン</Button>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary" component={Link} to="/user_registration">新規登録</Button>
                <div style={{ flexGrow: 1 }} />
            </Box>
        </Box>
    );
}
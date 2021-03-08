import { useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import path from "./path";


interface ISettingsProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}


export default function Settings(props: ISettingsProps) {
    const history = useHistory();
    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("設定");
        props.setAppbar.rightIcon(<></>);
    }, []);
    const handleLogout = () =>{
        localStorage.removeItem("sid");
        history.push(`${path.path}/login`);
    };
    const handleClearCache = () => {
        localStorage.clear();
        history.push(`${path.path}/login`);
    }
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "60px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }} component={Link} to={`${path.path}/group_management`} >グループ管理</Button>
                <Button onClick={handleLogout} color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }} >ログアウト</Button>
                <Button onClick={handleClearCache} color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }} >キャッシュ削除</Button>
            </Box>
        </Box>
    );
}
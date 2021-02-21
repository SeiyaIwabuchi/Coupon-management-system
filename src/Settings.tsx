import { useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


interface ISettingsProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function Settings(props: ISettingsProps) {
    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("設定");
        props.setAppbar.rightIcon(<></>);
    }, []);
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "60px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }} component={Link} to="/group_management" >グループ管理</Button>
            </Box>
        </Box>
    );
}
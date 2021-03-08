import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from "./path";


interface INoMatchProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}


export default function NoMatch(props: INoMatchProps) {
    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("404 Not Found");
        props.setAppbar.rightIcon(<></>);
    }, []);
    return (
        <Box style={{ height: "100%",display:"flex", justifyContent: "center", alignItems: "center" }}>
            <Box style={{ display:"flex",flexDirection:"column",justifyContent: "center", alignItems: "center" }}>
                <Typography>
                    存在しないページへアクセスしようとしました。
            </Typography>
                <Button onClick={()=>{window.location.href = "/app/"}} color="primary" variant="contained" style={{marginTop:"20px"}}>
                    ログイン
            </Button>
            </Box>
        </Box>
    );
}
import  { useEffect } from 'react';
import { Box, Fab, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import CouponCard from './myCard';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import EqualizerIcon from '@material-ui/icons/Equalizer';

interface ICreatedProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}

export default function Created(props: ICreatedProps) {

    
    let history = useHistory();


    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("発行一覧");
        props.setAppbar.rightIcon(<></>);
    }, []);


    return (
        <Box style={{ display: "flex", justifyContent: "center",paddingBottom:"60px" }}>
            <Fab color="primary" aria-label="add" style={{ position: "fixed", right: 30, bottom: 80 }} onClick={() => { history.push("/createnew"); }}>
                <AddIcon />
            </Fab>
            <Box>
                <CouponCard
                    title="肩たたき券"
                    subheader="2021/3/1まで  3回"
                    avatar="S"
                    image="/none.png"
                    message="敬老感謝の日にプレゼント"
                    hash="114514"
                    leftIcon={
                        <IconButton aria-label="use" onClick={() => { history.push("/createnew"); }}>
                            <CreateIcon />
                        </IconButton>
                    }
                    rightIcon={
                        <IconButton aria-label="delete" onClick={() => { history.push("/statistics") }}>
                            <EqualizerIcon />
                        </IconButton>
                    }
                />
            </Box>
        </Box>
    );
}
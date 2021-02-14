import react, { useEffect } from 'react';
import { Box, Fab, Typography } from '@material-ui/core';
import React from 'react';
import CouponCard from './myCard';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

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
        <Box style={{ height: "100%", display: "flex", justifyContent: "center" }}>
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
                />
            </Box>
        </Box>
    );
}
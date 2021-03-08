import React, { useEffect } from 'react';
import { Box, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import path from "./path";


interface IStatListItem {
    statistics: string;
}


function StatListItem(props: IStatListItem) {


    return (
        <ListItem style={{ borderBottom: "1px solid" }}>
            <ListItemText primary={props.statistics} style={{ width: "80vw" }} />
        </ListItem>
    );
}


interface IStatisticsProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}

export default function Statistics(props: IStatisticsProps) {


    let history = useHistory();


    useEffect(() => {
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                component={Link}
                to={`${path.path}/created`}
            >
                <ArrowBackIcon />
            </IconButton>
        );
        props.setAppbar.centerTitle("統計");
        props.setAppbar.rightIcon(<></>);
    }, []);


    return (
        <Box style={{ display: "flex", justifyContent: "center",paddingBottom:"60px" }}>
            <List style={{ padding: "10px", marginTop: "40px" }}>
                {
                    (() => {
                        let dests: JSX.Element[] = [];
                        for (let i = 0; i < 50; i++) {
                            dests.push(<StatListItem statistics="なんとかさん 2021/2/16 10:00" />);
                        }
                        return dests;
                    })()
                }
            </List>
        </Box>
    );
}
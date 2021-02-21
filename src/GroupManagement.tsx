import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Fab, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import dummyGroups from "./data/dummy/groups";
import Group from "./data/model/Group";
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


interface IGroupListItemProps {
    id: number;
    name:string;
}
function GroupListItem(props: IGroupListItemProps) {


    const [checked, setChecked] = useState(false);


    return (
        <ListItem button component={Link} to="/new_group">
            <ListItemText primary={`${props.name}`} />
        </ListItem>
    );
}


interface IGroupManagementProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function GroupManagement(props: IGroupManagementProps) {
    const history = useHistory();
    useEffect(() => {
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                component={Link}
                to="/settings"
            >
                <ArrowBackIcon />
            </IconButton>
        );
        props.setAppbar.centerTitle("グループ管理");
        props.setAppbar.rightIcon(<></>);
    }, []);
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "70px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
            <Fab color="primary" aria-label="add" style={{ position: "fixed", right: 30, bottom: 80 }} onClick={() => { history.push("/new_group"); }}>
                <AddIcon />
            </Fab>
                <List style={{ marginTop: "20px", width: "100%" }}>
                    {
                        dummyGroups.map((group:Group) => {
                            return <GroupListItem id={group.id} name={group.name}/>
                        })
                    }
                </List>
            </Box>
        </Box>
    );
}
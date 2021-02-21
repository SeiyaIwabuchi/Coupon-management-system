import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Fab, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import dummyGroups from "./data/dummy/groups";
import Group from "./data/model/Group";
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dummyUsers from "./data/dummy/users";


interface IGroupListItemProps {
    id: number;
    name:string;
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}
function GroupListItem(props: IGroupListItemProps) {


    const [checked, setChecked] = useState(false);
    const history = useHistory();


    return (
        <ListItem button onClick={()=>{
            props.setAppbar.centerTitle("グループ編集");
            history.push({
                pathname:"/new_group",
                state:{
                    group_id:props.id,
                    group_name:props.name,
                    group_users:dummyUsers
                }
            });
        }}>
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
            <Fab color="primary" aria-label="add" style={{ position: "fixed", right: 30, bottom: 80 }} onClick={() => { 
                history.push({
                    pathname:"/new_group",
                    state:{
                        group_id:-1,
                        group_name:"",
                        group_users:[]
                    }
                }); 
                props.setAppbar.centerTitle("グループ作成");
                }}>
                <AddIcon />
            </Fab>
                <List style={{ marginTop: "20px", width: "100%" }}>
                    {
                        dummyGroups.map((group:Group) => {
                            return <GroupListItem id={group.id} name={group.name} setAppbar={props.setAppbar}/>
                        })
                    }
                </List>
            </Box>
        </Box>
    );
}
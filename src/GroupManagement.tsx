import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Fab, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import dummyGroups from "./data/dummy/groups";
import Group from "./data/model/Group";
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dummyUsers from "./data/dummy/users";
import path from "./path";

interface IfetchedGroupsData {
    id: number;
    group_name: string;
}

interface IfetchedGroupsData2 {
    group_name: string;
    users: {
        user_id:number,
        user_name:string
    }[];
}

interface IGroupListItemProps {
    id: number;
    name: string;
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}
function GroupListItem(props: IGroupListItemProps) {


    const [checked, setChecked] = useState(false);
    const history = useHistory();


    return (
        <ListItem button onClick={async () => {
            let fetchedGroupsData:IfetchedGroupsData2 = {group_name:"",users:[]};
            props.setAppbar.centerTitle("グループ編集");
            await fetch(`${path.apiServerUrl}/group?sid=${localStorage.getItem("sid")}&group_id=${props.id}`)
            .then(res => res.json())
            .then((group:IfetchedGroupsData2)=>{
                fetchedGroupsData = group;
            });
            history.push({
                pathname: `${path.path}/new_group`,
                state: {
                    group_id: props.id,
                    group_name: fetchedGroupsData.group_name,
                    group_users: fetchedGroupsData.users,
                    mode:"update"
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
        handleSetLoading:(b:boolean) => void;
    };
}


export default function GroupManagement(props: IGroupManagementProps) {
    const [groups, s_groups] = useState<Group[]>([]);
    const history = useHistory();
    useEffect(() => {
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                component={Link}
                to={`${path.path}/settings`}
            >
                <ArrowBackIcon />
            </IconButton>
        );
        props.setAppbar.centerTitle("グループ管理");
        props.setAppbar.rightIcon(<></>);
        fetch(`${path.apiServerUrl}/groups?sid=${localStorage.getItem("sid")}`)
            .then(res => res.json())
            .then((res: IfetchedGroupsData[]) => { 
                s_groups(res.map((group) => ({ id: group.id, name: group.group_name })));
                console.log(res);
            });
    }, []);
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "70px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <Fab color="primary" aria-label="add" style={{ position: "fixed", right: 30, bottom: 80 }} onClick={() => {
                    history.push({
                        pathname: `${path.path}/new_group`,
                        state: {
                            group_id: -1,
                            group_name: "",
                            group_users: [],
                            mode:"create"
                        }
                    });
                    props.setAppbar.centerTitle("グループ作成");
                }}>
                    <AddIcon />
                </Fab>
                <List style={{ marginTop: "20px", width: "100%" }}>
                    {
                        groups.map((group: Group) => {
                            return <GroupListItem id={group.id} name={group.name} setAppbar={props.setAppbar} />
                        })
                    }
                </List>
            </Box>
        </Box>
    );
}
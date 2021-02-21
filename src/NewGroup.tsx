import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, IconButton, Link, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import User from "./data/model/User";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from 'react-router-dom';


interface IUserListItemProps {
    user:User;
    handleDeleteItem:() => void;
}
function UserListItem(props: IUserListItemProps) {


    const [checked, setChecked] = useState(false);


    return (
        <ListItem>
            <ListItemText primary={`${props.user.user_name}`} />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => props.handleDeleteItem()}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

interface ILocation{
    group_name:string;
    group_id:number;
    group_users:User[];
}

interface ISelectUserProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function NewGroup(props: ISelectUserProps) {
    const history = useHistory();
    const location = useLocation<ILocation>();
    const [group_name,s_group_name] = useState("");
    const [group_id,s_group_id] = useState(-1);
    const [users,s_users] = useState<User[]>([]);
    useEffect(() => {
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                style={{ flexGrow: 1 }}
                onClick={() => { history.replace("/group_management") }}
            >
                <CloseIcon />
            </IconButton>
        );
        //props.setAppbar.centerTitle("");
        props.setAppbar.rightIcon(
            <IconButton
                edge="end"
                color="inherit"
                aria-label="confirm"
                style={{ flexGrow: 1 }}
                onClick={() => { history.push("/group_management") }}
            >
                <CheckIcon />
            </IconButton>
        );
        s_group_name(location.state.group_name);
        s_group_id(location.state.group_id);
        s_users(location.state.group_users);
    }, []);
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "70px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <TextField 
                variant="filled" 
                label="グループ名" 
                placeholder="グループ名" 
                required style={{ marginTop: "20px", width: "100%" }} 
                value={group_name}
                onChange={(event)=>{s_group_name(event.target.value)}}
                />
                <TextField variant="filled" label="ユーザID" placeholder="ユーザID" style={{ marginTop: "20px", width: "100%" }} />
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>ユーザ追加</Button>
                <List style={{ marginTop: "20px", width: "100%" }}>
                    {
                        users.map((user: User) => {
                            return <UserListItem user={user}  handleDeleteItem={()=>{
                                console.log(users.filter(u => u != user));
                                s_users(users.filter(u => u != user));
                            }}/>
                        })
                    }
                </List>
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>グループ削除</Button>
            </Box>
        </Box>
    );
}
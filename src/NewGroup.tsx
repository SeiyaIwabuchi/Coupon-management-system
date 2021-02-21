import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, IconButton, Link, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import dummyUsers from "./data/dummy/users";
import User from "./data/model/User";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';


interface IUserListItemProps {
    id: number;
    name: string;
}
function UserListItem(props: IUserListItemProps) {


    const [checked, setChecked] = useState(false);


    return (
        <ListItem>
            <ListItemText primary={`${props.name}`} />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                        //削除(props.id)
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
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
        props.setAppbar.centerTitle("グループ作成");
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
    }, []);
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "70px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <TextField variant="filled" label="グループ名" placeholder="グループ名" required style={{ marginTop: "20px", width: "100%" }} />
                <TextField variant="filled" label="ユーザID" placeholder="ユーザID" style={{ marginTop: "20px", width: "100%" }} />
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>ユーザ追加</Button>
                <List style={{ marginTop: "20px", width: "100%" }}>
                    {
                        dummyUsers.map((user: User) => {
                            return <UserListItem id={user.user_id} name={user.user_name} />
                        })
                    }
                </List>
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>グループ削除</Button>
            </Box>
        </Box>
    );
}
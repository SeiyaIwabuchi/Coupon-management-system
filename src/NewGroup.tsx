import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, IconButton, Link, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import User from "./data/model/User";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from 'react-router-dom';


interface IUserListItemProps {
    user: User;
    handleDeleteItem: () => void;
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

interface ILocation {
    group_name: string;
    group_id: number;
    group_users: User[];
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
    const [group_name, s_group_name] = useState("");
    const [group_id, s_group_id] = useState(-1);
    const [users, s_users] = useState<User[]>([]);
    const [inputUserId, s_inputUserId] = useState("");
    const [userId, s_userId] = useState(-1);
    const [isDuplicateUsers, s_isDuplicateUsers] = useState(false);

    const handleChaengeUserIdInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let userId_ = -1;
        s_inputUserId(event.target.value);
        await fetch(`http://127.0.0.1:31354/user?sid=${localStorage.getItem("sid")}&login_id=${event.target.value}`)
            .then(res => res.json())
            .then((resData) => {
                s_userId(resData.userId);
                userId_ = resData.userId;
            });
        s_isDuplicateUsers(users.findIndex(user => user.user_name == event.target.value) != -1);
    };

    const handleUseAdd = () => {
        const newUsers = users.concat();
        newUsers.push(new User(userId, inputUserId));
        localStorage.setItem("group_users",JSON.stringify(newUsers))
        console.log(newUsers);
        s_users(newUsers);
        s_isDuplicateUsers(true);
        s_inputUserId("");
    };

    const handleGroupAdd = async () => {
        const gn = localStorage.getItem("group_name");
        const gus_ = localStorage.getItem("group_users");
        const gus:User[] = JSON.parse(gus_ != null?gus_:"[]");
        await fetch(`http://127.0.0.1:31354/group?sid=${localStorage.getItem("sid")}`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                group_name: gn,
                users: gus.map((user) => user.user_id)
            }),
        })
            .then(res => res.json())
            .catch((reason) => { console.log(reason) });
        history.push("/group_management");
    };

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
        props.setAppbar.rightIcon(
            <IconButton
                edge="end"
                color="inherit"
                aria-label="confirm"
                style={{ flexGrow: 1 }}
                onClick={handleGroupAdd}
            >
                <CheckIcon />
            </IconButton>
        );
        s_group_name(location.state.group_name);
        s_group_id(location.state.group_id);
        s_users(location.state.group_users);
        localStorage.setItem("group_name",location.state.group_name);
        localStorage.setItem("group_users",JSON.stringify(location.state.group_users))
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
                    onChange={(event) => { s_group_name(event.target.value); localStorage.setItem("group_name",event.target.value); }}
                />
                <TextField variant="filled" label="ユーザID" placeholder="ユーザID" style={{ marginTop: "20px", width: "100%" }} onChange={handleChaengeUserIdInput} value={inputUserId} />
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }} disabled={(userId == -1) || isDuplicateUsers} onClick={handleUseAdd}>ユーザ追加</Button>
                <List style={{ marginTop: "20px", width: "100%" }}>
                    {
                        users.map((user: User) => {
                            return <UserListItem key={user.user_id} user={user} handleDeleteItem={() => {
                                console.log(users.filter(u => u != user));
                                s_users(users.filter(u => u != user));
                            }} />
                        })
                    }
                </List>
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>グループ削除</Button>
            </Box>
        </Box>
    );
}
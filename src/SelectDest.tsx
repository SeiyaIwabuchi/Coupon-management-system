import { Box, Button, FormControl, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from 'react-router-dom';
import path from "./path";

interface IDestListItem {
    destName: string;
}


function DestListItem(props: IDestListItem) {


    let history = useHistory();

    return (
        <ListItem button onClick={() => {
            history.push({
                pathname: `${path.path}/createnew`,
                state: { destName: props.destName }
            });
        }}>
            <ListItemText primary={props.destName} />
        </ListItem>
    );
}


interface ISelectDestProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}

export default function SelectDest(props: ISelectDestProps) {


    let history = useHistory();
    let location = useLocation<any>();


    const [destk, sdestk] = useState<any>(0);
    const [inputUserId, s_inputUserId] = useState("");
    const [userId, s_userId] = useState(-1);


    const handleChaengeUserIdInput = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let userId_ = -1;
        s_inputUserId(event.target.value);
        await fetch(`${path.apiServerUrl}/user?sid=${localStorage.getItem("sid")}&login_id=${event.target.value}`)
            .then(res => res.json())
            .then((resData) => {
                s_userId(resData.userId);
                userId_ = resData.userId;
                console.log(userId_);
            });
    };


    useEffect(() => {
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                style={{ flexGrow: 1 }}
                onClick={() => { 
                    const t_locationState = localStorage.getItem("locationState");
                    if(t_locationState != null){
                        history.push(`${path.path}/createnew`,JSON.parse(t_locationState));
                    }
                 }}
            >
                <CloseIcon />
            </IconButton>
        );
        props.setAppbar.centerTitle("配布先選択");
        props.setAppbar.rightIcon(<></>);
        localStorage.setItem("locationState",JSON.stringify(location.state));
    }, []);


    return (
        <Box style={{ display: "flex", flexDirection: "column", paddingBottom: "70px" }}>
            <FormControl variant="filled" style={{ marginTop: "10px", width: "100%" }}>
                <Select value={destk} onChange={event => { sdestk(event.target.value) }}>
                    <MenuItem value={0}>個人</MenuItem>
                    <MenuItem value={1}>グループ</MenuItem>
                </Select>
            </FormControl>
            {(() => {
                if (destk == 0) {
                    return (
                    <>
                        <TextField variant="filled" label="ユーザID" placeholder="ユーザID" style={{ marginTop: "20px", width: "100%" }} onChange={handleChaengeUserIdInput} value={inputUserId} />
                        <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }} disabled={(userId == -1)} onClick={()=>{
                            let locationState = location.state.state;
                            locationState.destination.user_id = userId;
                            locationState.destinationName = inputUserId;
                            localStorage.setItem("locationState",locationState.destination.user_id);
                            history.push(`${path.path}/createnew`,{state:locationState});
                        }}>ユーザ追加</Button>
                    </>
                    );
                } else {
                    return (
                        <List style={{ border: "1px solid #909090", borderRadius: 10, padding: "10px", marginTop: "40px" }}>
                            {
                                (() => {
                                    let dests: JSX.Element[] = [];
                                    for (let i = 0; i < 100; i++) {
                                        dests.push(<DestListItem destName="なんとかさん" />);
                                    }
                                    return dests;
                                })()
                            }
                        </List>)
                }
            })()}
        </Box>
    );
}
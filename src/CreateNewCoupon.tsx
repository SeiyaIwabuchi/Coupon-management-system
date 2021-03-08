import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, Fab, FormControl, IconButton, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import path from "./path";

interface IGift {
    image_id: number,
    gift_name: string,
    gift_kind_id: number,
    destination: {
        user_id: number | null,
        group_id: number | null
    },
    expiration_date: string,
    available_times: number
}

interface ILocationState {
    temp_image_url: string;
    image_id: number;
    gift_name: string;
    gift_kind_id: any;
    destination: {
        user_id: null;
        group_id: null;
    };
    expiration_date: string;
    available_times: number;
}

interface ICreateNewProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}


export default function CreateNew(props: ICreateNewProps) {


    const [giftType, s_giftType] = useState<any>(0);
    const [giftName, s_giftName] = useState("");
    const [imageId, s_imageId] = useState(-1);
    const [expiration_date, s_expiration_date] = useState("");
    const [availableTimes, s_availableTimes] = useState(0);
    const [temp_image_url, s_temp_image_url] = useState("/none.png");
    const [destination, s_destination] =
        useState<{ user_id: string | number | null, group_id: string | number | null }>({ user_id: -1, group_id: null });
    const [destinationName, s_destinationName] = useState("");
    const [giftId, s_giftId] = useState(-1);
    const [createButtonLabel, s_createButtonLabel] = useState("作成");
    const [pageLabel, s_pageLabel] = useState("新規作成");


    let history = useHistory();
    let location = useLocation<any>();


    const SelectImage = () => {
        return (
            <Box>
                <CardMedia style={{ height: "51vw", width: "90vw" }} image={temp_image_url} />
                <Fab style={{ position: "absolute", marginTop: "-35%", marginLeft: "35%" }} color="primary">
                    <AddIcon />
                    <input type="file"
                        style={{ opacity: 0, position: "absolute" }}
                        onChange={async (event) => {
                            if (event.target.files != null) {
                                let tfilePath = event.target.files[0];
                                if (tfilePath != null) {
                                    s_temp_image_url(URL.createObjectURL(tfilePath));
                                    const formData = new FormData();
                                    console.log(tfilePath);
                                    if (tfilePath != undefined) {
                                        formData.append("file", tfilePath);
                                        console.log(tfilePath.name);
                                    }
                                    props.setAppbar.handleSetLoading(true);
                                    await fetch(`${path.apiServerUrl}/gift_image?sid=${localStorage.getItem("sid")}`, {
                                        method: "POST",
                                        mode: "cors",
                                        body: formData,
                                    })
                                        .then(res => res.json())
                                        .then((res: { image_id: number }) => {
                                            s_imageId(res.image_id);
                                        });
                                    props.setAppbar.handleSetLoading(false);
                                }
                            }
                        }} />
                </Fab>
            </Box>
        );
    }

    const handleSelecrDest = () => {
        history.push(`${path.path}/selectdest`, {
            state: {
                temp_image_url: temp_image_url,
                image_id: imageId,
                gift_name: giftName,
                gift_kind_id: giftType,
                destination: {
                    user_id: null,
                    group_id: null
                },
                expiration_date: expiration_date,
                available_times: availableTimes
            }
        });
    };

    const handleCreate = async () => {
        // 新規作成か更新かの判断はgiftIdが-1が否かで判断
        props.setAppbar.handleSetLoading(true);
        if (giftId == -1) {
            // 新規作成
            await fetch(`${path.apiServerUrl}/gift?sid=${localStorage.getItem("sid")}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_id: imageId,
                    gift_name: giftName,
                    gift_kind_id: giftType,
                    destination: destination,
                    expiration_date: expiration_date,
                    available_times: availableTimes
                }),
            });
            history.push(`${path.path}/created`);
        } else {
            // 更新
            await fetch(`${path.apiServerUrl}/gift?sid=${localStorage.getItem("sid")}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gift_id: giftId,
                    image_id: imageId,
                    gift_name: giftName,
                    gift_kind_id: giftType,
                    destination: destination,
                    expiration_date: expiration_date,
                    available_times: availableTimes
                }),
            });
            props.setAppbar.handleSetLoading(false);
            history.push(`${path.path}/created`);
        }
    };

    const handleDelete = async () => {
        props.setAppbar.handleSetLoading(true);
        await fetch(`${path.apiServerUrl}/gift?sid=${localStorage.getItem("sid")}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gift_id: giftId
            }),
        });
        props.setAppbar.handleSetLoading(false);
        history.push(`${path.path}/created`);
    };

    useEffect(() => {
        props.setAppbar.handleSetLoading(true);
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                style={{ flexGrow: 1 }}
                onClick={() => { history.replace(`${path.path}/created`) }}
            >
                <CloseIcon />
            </IconButton>
        );
        props.setAppbar.rightIcon(
            <></>
        );
        const t_locationState = location.state;
        console.log(t_locationState);
        if (t_locationState != null) {
            if (t_locationState.state.gift_id != undefined) {
                // 発行一覧から編集に来た時
                s_pageLabel("編集");
                s_giftId(t_locationState.state.gift_id);
                s_createButtonLabel("更新");
                fetch(`${path.apiServerUrl}/gift?sid=${localStorage.getItem("sid")}&gift_id=${t_locationState.state.gift_id}`)
                    .then(res => res.json())
                    .then((res: IGift) => {
                        s_imageId(res.image_id);
                        s_giftName(res.gift_name);
                        s_giftType(res.gift_kind_id);
                        const tDest = {user_id:null,group_id:null};
                        if(res.destination.user_id != null){
                        fetch(`${path.apiServerUrl}/user?sid=${localStorage.getItem("sid")}&login_id=${res.destination.user_id}`)
                            .then(res => res.json())
                            .then((resData) => {
                                tDest.user_id = resData.userId;
                                s_destination(tDest);
                            });
                        }
                        s_destinationName(
                            res.destination.user_id != null ? res.destination.user_id.toString() :
                                res.destination.group_id != null ? res.destination.group_id.toString() : ""
                        );
                        const expDate = new Date(res.expiration_date);
                        s_expiration_date(`${expDate.getUTCFullYear()}-${(`0` + `${expDate.getUTCMonth() + 1}`).slice(-2)}-${(`0` + `${expDate.getUTCDate()}`).slice(-2)}`);
                        s_availableTimes(res.available_times);
                        fetch(`${path.apiServerUrl}/gift_image?sid=${localStorage.getItem("sid")}&image_id=${res.image_id}`)
                            .then(res => res.blob())
                            .then(res => {
                                s_temp_image_url(URL.createObjectURL(res));
                            });
                    });
            } else {
                // 配布先選択画面から戻ってきたとき
                s_temp_image_url(t_locationState.state.temp_image_url);
                s_imageId(t_locationState.state.image_id);
                s_giftName(t_locationState.state.gift_name);
                s_giftType(t_locationState.state.gift_kind_id);
                s_expiration_date(t_locationState.state.expiration_date);
                s_availableTimes(t_locationState.state.available_times);
                s_destination(t_locationState.state.destination);
                s_destinationName(t_locationState.state.destinationName);
                console.debug(t_locationState.state.temp_image_url);
            }
        }
        props.setAppbar.handleSetLoading(false);
    }, []);


    return (
        <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "70px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                {(() => { props.setAppbar.centerTitle(pageLabel); })()}
                <SelectImage />
                <TextField value={giftName} onChange={event => s_giftName(event.target.value)} variant="filled" label="クーポン名" placeholder="クーポン名" required style={{ marginTop: "20px", width: "100%" }} />
                <FormControl variant="filled" style={{ marginTop: "20px", width: "100%" }}>
                    <Select value={giftType} onChange={event => { s_giftType(event.target.value) }}>
                        <MenuItem value={0}>クーポン種類</MenuItem>
                        <MenuItem value={7}>共有クーポン</MenuItem>
                        <MenuItem value={8}>回数クーポン</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleSelecrDest} color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>配布先選択</Button>
                <Typography style={{ marginTop: "20px", width: "100%" }}>{destinationName}</Typography>
                <TextField value={expiration_date} onChange={event => s_expiration_date(event.target.value)} label="期限日" type="date" InputLabelProps={{ shrink: true }} style={{ marginTop: "20px", width: "100%" }} />
                <TextField value={availableTimes} onChange={event => s_availableTimes(parseInt(event.target.value))} variant="filled" label="使用可能回数" placeholder="使用可能回数" type="number" required style={{ marginTop: "20px", width: "100%" }} />
                <Button onClick={handleCreate} color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>{createButtonLabel}</Button>
                {
                    giftId != -1 ?
                        <Button onClick={handleDelete} color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>ギフト削除</Button> :
                        <></>
                }
            </Box>
        </Box>
    );
}
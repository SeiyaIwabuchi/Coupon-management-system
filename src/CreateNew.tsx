import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, Fab, FormControl, IconButton, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

function SelectImage() {
    const [filePath, sfilePath] = useState("/none.png");
    return (
        <Box>
            <CardMedia style={{ height: "51vw", width: "90vw" }} image={filePath} />
            <Fab style={{ position: "absolute", marginTop: "-35%", marginLeft: "35%" }} color="primary">
                <AddIcon />
                <input type="file"
                    style={{ opacity: 0, position: "absolute" }}
                    onChange={(event) => {
                        if (event.target.files != null) {
                            let tfilePath = event.target.files[0];
                            if (tfilePath != null) {
                                sfilePath(URL.createObjectURL(tfilePath));
                                console.log(URL.createObjectURL(tfilePath));
                            }
                        }
                    }} />
            </Fab>
        </Box>
    );
}


interface ICreateNewProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}

interface ILocatoin{
    destName:string;
}


export default function CreateNew(props: ICreateNewProps) {


    const [couponType, scouponType] = useState<any>(0);


    let history = useHistory();
    let location = useLocation<ILocatoin>();


    useEffect(() => {
        props.setAppbar.leftIcon(
            <IconButton
                edge="start"
                color="inherit"
                aria-label="goback"
                style={{ flexGrow: 1 }}
                onClick={() => { history.goBack() }}
            >
                <CloseIcon />
            </IconButton>
        );
        props.setAppbar.centerTitle("新規作成");
        props.setAppbar.rightIcon(
            <IconButton
                edge="end"
                color="inherit"
                aria-label="confirm"
                style={{ flexGrow: 1 }}
                onClick={() => { history.push("/created") }}
            >
                <CheckIcon />
            </IconButton>
        );
    }, []);


    return (
        <Box style={{ height:"800px",display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <SelectImage />
                <TextField variant="filled" label="クーポン名" placeholder="クーポン名" required style={{ marginTop: "20px", width: "100%" }} />
                <FormControl variant="filled" style={{ marginTop: "20px", width: "100%" }}>
                    <Select value={couponType} onChange={event => { scouponType(event.target.value) }}>
                        <MenuItem value={0}>クーポン種類</MenuItem>
                        <MenuItem value={1}>共有クーポン</MenuItem>
                        <MenuItem value={2}>回数クーポン</MenuItem>
                    </Select>
                </FormControl>
                <Button component={Link} to="/selectdest" color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>配布先選択</Button>
                <Typography style={{ marginTop: "20px", width: "100%" }}>{location.state.destName}</Typography>
                <Button color="primary" variant="contained" style={{ marginTop: "20px", width: "100%" }}>期限日選択</Button>
                <Typography style={{ marginTop: "20px", width: "100%" }}>期限日表示</Typography>
                <TextField variant="filled" label="使用可能回数" placeholder="使用可能回数" type="number" required style={{ marginTop: "20px", width: "100%" }} />
            </Box>
        </Box>
    );
}
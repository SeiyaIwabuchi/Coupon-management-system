
import classes from "*.module.css";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from "react";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import { CheckBoxOutlineBlankRounded } from "@material-ui/icons";

//親要素から受け取るプロパティ
interface ICommonProps {

}

// アプリ全体で共通のデザイン
// このコンポーネントに要素を入れていくようになる。
export default function Common(props: ICommonProps) {
    //ステートフックまとめ
    let initCommonHooks = {
        leftIconButton: (
            <IconButton edge="start" color="inherit" aria-label="menu" style={{ flexGrow: 1 }}>
                <MenuIcon />
            </IconButton>),
        centerLabel: "たいぽぐらふぃ",
        rightIconButton: (<Button color="inherit" style={{ flexGrow: 1 }}>Login</Button>),
    };
    const [commonHooks, setCommonHooks] = useState(initCommonHooks);

    return (
        <Box>
            <AppBar position="fixed" >
                <Toolbar style={{ display: "flex", flexDirection: "row" }}>
                    {commonHooks.leftIconButton}
                    <Typography variant="h6" style={{ flexGrow: 20, textAlign: "center" }}>
                        {commonHooks.centerLabel}
                    </Typography>
                    {commonHooks.rightIconButton}
                </Toolbar>
            </AppBar>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "54px", border: "5px solid",height:window.innerHeight-(58*2.1) }}>
                <Typography variant="h1">
                    ここにいろいろ表示させる！
            </Typography>
            </Box>
            <BottomNavigation
                value={0}
                onChange={(event, newValue) => {

                }}
                showLabels
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    border: "1px solid #919191",
                    boxShadow: "0px 0px 5px"
                }}
            >
                <BottomNavigationAction label="クーポン" icon={<ConfirmationNumberIcon />} />
                <BottomNavigationAction label="発行" icon={<CreateIcon />} />
                <BottomNavigationAction label="設定" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Box>
    );
}
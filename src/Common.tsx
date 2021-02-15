
import classes from "*.module.css";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from "react";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory, withRouter, Link, useLocation, Route, Redirect, Switch } from "react-router-dom";
import Coupon from "./Coupon";
import Created from "./Created";
import Settings from "./Settings";
import Login from "./Login";
import CreateNew from "./CreateNew";
import NoMatch from "./NoMatch";
import SelectDest from "./SelectDest";


//親要素から受け取るプロパティ
interface ICommonProps {

}

// アプリ全体で共通のデザイン
// このコンポーネントに要素を入れていくようになる。
export default function Common(props: ICommonProps) {
    let history = useHistory(); //画面遷移用
    let location = useLocation(); //画面遷移用

    const [leftIconButton, setleftIconButton] = useState(
        <IconButton edge="start" color="inherit" aria-label="menu" style={{ flexGrow: 1 }}>
            <MenuIcon />
        </IconButton>
    );
    const [centerLabel, setcenterLabel] = useState("たいぽぐらふぃ");
    const [rightIconButton, setrightIconButton] = useState(<Button color="inherit" style={{ flexGrow: 1 }}>Login</Button>);
    const [navNumber, setnavNumber] = useState(0);


    let setAppbar = { leftIcon: setleftIconButton, centerTitle: setcenterLabel, rightIcon: setrightIconButton };


    return (
        <Box>
            <AppBar position="fixed" >
                <Toolbar style={{ display: "flex", flexDirection: "row" }}>
                    {leftIconButton}
                    <Typography variant="h6" style={{ flexGrow: 20, textAlign: "center" }}>
                        {centerLabel}
                    </Typography>
                    {rightIconButton}
                </Toolbar>
            </AppBar>
            <Box style={{ marginTop: "56px", height: window.innerHeight - (58 * 2.1) }}>
                <Switch>
                    <Route exact path="/">
                        {localStorage.getItem("uid") == null ? <Redirect to="/login" /> : <Redirect to="/Coupon" />}
                    </Route>
                    <Route path="/coupon">
                        {localStorage.getItem("uid") == null ? <Redirect to="/Login" /> : <Coupon setAppbar={setAppbar} />}
                    </Route>
                    <Route path="/created">
                        {localStorage.getItem("uid") == null ? <Redirect to="/Login" /> : <Created setAppbar={setAppbar} />}
                    </Route>
                    <Route path="/settings">
                        {localStorage.getItem("uid") == null ? <Redirect to="/Login" /> : <Settings setAppbar={setAppbar} />}
                    </Route>
                    <Route path="/createnew">
                        {localStorage.getItem("uid") == null ? <Redirect to="/Login" /> : <CreateNew setAppbar={setAppbar} />}
                    </Route>
                    <Route path="/login">
                        <Login setAppbar={setAppbar}/>
                    </Route>
                    <Route path="/selectdest">
                        <SelectDest setAppbar={setAppbar}/>
                    </Route>
                    <Route path="*">
                        <NoMatch setAppbar={setAppbar} />
                    </Route>
                </Switch>
            </Box>
            <BottomNavigation
                value={location.pathname}
                showLabels
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    border: "1px solid #919191",
                    boxShadow: "0px 0px 5px #999999",
                    zIndex:9999
                }}
            >
                <BottomNavigationAction label="クーポン" icon={<ConfirmationNumberIcon />} value={"/coupon"} component={Link} to={"/coupon"} />
                <BottomNavigationAction label="発行" icon={<CreateIcon />} value={"/created"} component={Link} to={"/created"} />
                <BottomNavigationAction label="設定" icon={<SettingsIcon />} value={"/settings"} component={Link} to={"/settings"} />
            </BottomNavigation>
        </Box>
    );
}
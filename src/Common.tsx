
import { AppBar, Toolbar, IconButton, Typography, Button, Box, BottomNavigation, BottomNavigationAction, CircularProgress } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from "react";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory, withRouter, Link, useLocation, Route, Redirect, Switch } from "react-router-dom";
import Coupon from "./Coupon";
import Created from "./Created";
import Settings from "./Settings";
import Login from "./Login";
import CreateNew from "./CreateNewCoupon";
import NoMatch from "./NoMatch";
import SelectDest from "./SelectDest";
import Statistics from "./Statistics";
import NewUserRegistration from "./NewUserRegistration";
import NewGroup from "./NewGroup";
import GroupManagement from "./GroupManagement";
import path from "./path";
import Loading from "./Loading";

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
    const [centerLabel, setcenterLabel] = useState("");
    const [rightIconButton, setrightIconButton] = useState(<Button color="inherit" style={{ flexGrow: 1 }}>Login</Button>);
    const [isLoading,s_isLoading] = useState(false);

    let setAppbar = { 
        leftIcon: setleftIconButton, 
        centerTitle: setcenterLabel, 
        rightIcon: setrightIconButton ,
        handleSetLoading:s_isLoading
    };

    useEffect(() => {
        console.log(path.path);
    });

    return (
        <Box>
            <Loading isShow={isLoading}/>
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
                    <Route exact path={`${path.path}/`}>
                        {localStorage.getItem("sid") == null ? <Redirect to= {`${path.path}/login`} /> : <Redirect to={`${path.path}/coupon`} />}
                    </Route>
                    <Route path={`${path.path}/coupon`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <Coupon setAppbar={setAppbar} />}
                    </Route>
                    <Route path={`${path.path}/created`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <Created setAppbar={setAppbar} />}
                    </Route>
                    <Route path={`${path.path}/settings`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <Settings setAppbar={setAppbar} />}
                    </Route>
                    <Route path={`${path.path}/createnew`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <CreateNew setAppbar={setAppbar} />}
                    </Route>
                    <Route path={`${path.path}/login`}>
                        <Login setAppbar={setAppbar}/>
                    </Route>
                    <Route path={`${path.path}/selectdest`}>
                    {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <SelectDest setAppbar={setAppbar}/>}
                    </Route>
                    <Route path={`${path.path}/statistics`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <Statistics setAppbar={setAppbar}/>}
                    </Route>
                    <Route path={`${path.path}/new_group`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <NewGroup setAppbar={setAppbar}/>}
                    </Route>
                    <Route path={`${path.path}/group_management`}>
                        {localStorage.getItem("sid") == null ? <Redirect to={`${path.path}/login`} /> : <GroupManagement setAppbar={setAppbar}/>}
                    </Route>
                    <Route path={`${path.path}/user_registration`}>
                        <NewUserRegistration setAppbar={setAppbar}/>
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
                <BottomNavigationAction label="クーポン" icon={<ConfirmationNumberIcon />} value={`${path.path}/coupon`} component={Link} to={`${path.path}/coupon`} />
                <BottomNavigationAction label="発行" icon={<CreateIcon />} value={`${path.path}/created`} component={Link} to={`${path.path}/created`} />
                <BottomNavigationAction label="設定" icon={<SettingsIcon />} value={`${path.path}/settings`} component={Link} to={`${path.path}/settings`} />
            </BottomNavigation>
        </Box>
    );
}
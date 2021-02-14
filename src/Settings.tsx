import react, { useEffect } from 'react';
import { Typography } from '@material-ui/core';


interface ISettingsProps{
    setAppbar:{
        leftIcon:(icon:JSX.Element) => void,
        centerTitle:(title:string) => void;
        rightIcon:(icon:JSX.Element) => void;
    };
}


export default function Settings(props:ISettingsProps) {
    useEffect(()=>{
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("設定");
        props.setAppbar.rightIcon(<></>);
    },[]);
    return (
        <Typography variant="h1">
            ここ設定の画面
        </Typography>
    );
}
import { Box, Typography } from '@material-ui/core';
import CouponCard from './myCard';
import React, { useEffect } from 'react';

interface ICouponProps{
    setAppbar:{
        leftIcon:(icon:JSX.Element) => void,
        centerTitle:(title:string) => void;
        rightIcon:(icon:JSX.Element) => void;
    };
}

export default function Coupon(props:ICouponProps) {
    useEffect(()=>{
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("クーポン一覧");
        props.setAppbar.rightIcon(<></>);
    },[]);
    return (
        <Box style={{ height: "100%", display: "flex", justifyContent: "center" }}>
            <Box>
                <CouponCard
                title="肩たたき券"
                subheader="2021/3/1まで  残り3回"
                avatar="S"
                image="/none.png"
                message="敬老感謝の日にプレゼント"
                hash="114514"
                />
            </Box>
            </Box>
    );
}
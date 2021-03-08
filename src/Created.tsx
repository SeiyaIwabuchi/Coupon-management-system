import { useEffect, useState } from 'react';
import { Box, Fab, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import CouponCard from './myCard';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import CreateIcon from '@material-ui/icons/Create';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import path from "./path";

interface ICreatedProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}

export default function Created(props: ICreatedProps) {

    interface IGiftData {
        gift_id: number,
        image_id: number,
        gift_name: string,
        gift_kind_id: number,
        expiration_date: string,
        available_times: number
    }

    interface IGiftCard {
        title: string;
        subheader: string;
        avatar: string;
        image: string;
        message: string;
        hash: number;
    }

    let history = useHistory();
    const [createdGiftsObj, s_createdGiftsObj] = useState<JSX.Element[]>([]);
    const [imageUrl, s_imageUrl] = useState("imageUrl");

    const CreateCouponCard = (props: IGiftCard) => {
        return (
            <CouponCard
                title={props.title}
                subheader={props.subheader}
                avatar={props.avatar}
                image={props.image}
                message={props.message}
                hash={props.hash}
                leftIcon={
                    <IconButton aria-label="use" onClick={() => { history.push(`${path.path}/createnew`,{state:{gift_id:props.hash}}); }}>
                        <CreateIcon />
                    </IconButton>
                }
                rightIcon={
                    <IconButton aria-label="delete" onClick={() => { history.push(`${path.path}/statistics`) }}>
                        <EqualizerIcon />
                    </IconButton>
                }
            />
        );
    }

    const CreateCouponList = async (props: { giftDataObj: IGiftData[] }) => {
        console.log(props.giftDataObj);
        const list: JSX.Element[] = [];
        let imageUrl = "";
        for (let i = 0; i < props.giftDataObj.length; i++) {
            let gift = props.giftDataObj[i];
            await fetch(`${path.apiServerUrl}/gift_image?sid=${localStorage.getItem("sid")}&image_id=${gift.image_id}`)
                .then(res => res.blob())
                .then(res => {
                    imageUrl = URL.createObjectURL(res);
                });
            const expDate = new Date(gift.expiration_date);
            list.push(
                CreateCouponCard({
                    title: gift.gift_name,
                    subheader: `${expDate.getUTCFullYear()}/${(`0` + `${expDate.getUTCMonth() + 1}`).slice(-2)}/${(`0` + `${expDate.getUTCDate()}`).slice(-2)}まで　${gift.available_times}回`,
                    avatar: gift.gift_name.charAt(0),
                    image: imageUrl,
                    message: "",
                    hash: gift.gift_id
                })
            );
        }
        s_createdGiftsObj(list);
    }


    useEffect(() => {
        props.setAppbar.handleSetLoading(true);
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("発行一覧");
        props.setAppbar.rightIcon(<></>);
        let giftDatas: IGiftData[] = [];
        fetch(`${path.apiServerUrl}/gifts_created?sid=${localStorage.getItem("sid")}`)
            .then(res => res.json())
            .then((res: IGiftData[]) => {
                CreateCouponList({ giftDataObj: res });
                props.setAppbar.handleSetLoading(false);
            });
    }, []);


    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "60px" }}>
            <Fab color="primary" aria-label="add" style={{ position: "fixed", right: 30, bottom: 80 }} onClick={() => { history.push(`${path.path}/createnew`); }}>
                <AddIcon />
            </Fab>
            <Box>
                {createdGiftsObj}
            </Box>
        </Box >
    );
}
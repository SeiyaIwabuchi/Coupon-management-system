import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CouponCard from './myCard';
import React, { useEffect, useState } from 'react';
import MyDialog from './MyDialog';
import ShareIcon from '@material-ui/icons/Share';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import path from "./path";


interface ICouponProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
        handleSetLoading:(b:boolean) => void;
    };
}


export default function Coupon(props: ICouponProps) {

    let history = useHistory();

    const [useConfDiagOpen, suseConfDiagOpen] = useState(false);
    const [deleteConfDiagOpen, sdeleteConfDiagOpen] = useState(false);
    const [createdGiftsObj, s_createdGiftsObj] = useState<JSX.Element[]>([]);
    const [currentGiftId, s_currentGiftId] = useState(-1);

    interface IGiftCard {
        title: string;
        subheader: string;
        avatar: string;
        image: string;
        message: string;
        hash: number;
    }

    interface IGiftData {
        gift_id: number,
        image_id: number,
        gift_name: string,
        gift_kind_id: number,
        expiration_date: string,
        available_times: number
    }

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
                    <IconButton aria-label="use" onClick={() => {
                        suseConfDiagOpen(true);
                        s_currentGiftId(props.hash);
                    }}>
                        <CheckIcon />
                    </IconButton>
                }
                rightIcon={
                    <IconButton aria-label="delete" onClick={() => {
                        sdeleteConfDiagOpen(true);
                        s_currentGiftId(props.hash);
                    }}>
                        <DeleteIcon />
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
                    subheader: `${expDate.getUTCFullYear()}/${(`0` + `${expDate.getUTCMonth() + 1}`).slice(-2)}/${(`0` + `${expDate.getUTCDate()}`).slice(-2)}まで　残り${gift.available_times}回`,
                    avatar: gift.gift_name.charAt(0),
                    image: imageUrl,
                    message: "",
                    hash: gift.gift_id
                })
            );
        }
        s_createdGiftsObj(list);
    };

    const handleUse = async (isOpen: boolean) => {
        await fetch(`${path.apiServerUrl}/usage_gift?sid=${localStorage.getItem("sid")}`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gift_id: currentGiftId
            }),
        });
        suseConfDiagOpen(isOpen);
        refreshCards();
    };

    const handleDelete = (isOpen: boolean) => {
        const SdeletedGifts = localStorage.getItem("deletedGifts");
        let deletedGifts: number[] = [];
        if (SdeletedGifts != null) {
            deletedGifts = JSON.parse(SdeletedGifts);
        }
        if (deletedGifts.indexOf(currentGiftId) == -1) {
            deletedGifts.push(currentGiftId);
            localStorage.setItem("deletedGifts", JSON.stringify(deletedGifts));
        }
        sdeleteConfDiagOpen(isOpen);
        refreshCards();
    };

    const refreshCards = () => {
        props.setAppbar.handleSetLoading(true);
        fetch(`${path.apiServerUrl}/gifts_distributed?sid=${localStorage.getItem("sid")}`)
            .then(res => res.json())
            .then(async (res: IGiftData[]) => {
                let res_: IGiftData[] = res.slice();
                for (let i = 0; i < res_.length; i++) {
                    await fetch(`${path.apiServerUrl}/usage_gift?sid=${localStorage.getItem("sid")}&gift_id=${res_[i].gift_id}`)
                        .then(res__ => res__.json())
                        .then((res__: { count: number }) => {
                            res_[i].available_times -= res__.count;
                        });
                }
                let res__ = res_.filter(gift => gift.available_times > 0); //残り回数でフィルタ
                const date = new Date();
                res__ = res__.filter(gift => { //日付でフィルタ
                    return new Date(gift.expiration_date) >= date;
                });
                const SdeletedGifts = localStorage.getItem("deletedGifts");
                let deletedGifts: number[] = [];
                if (SdeletedGifts != null) {
                    deletedGifts = JSON.parse(SdeletedGifts);
                }
                res__ = res__.filter(gift => deletedGifts.indexOf(gift.gift_id) == -1); //削除済みでフィルタ
                CreateCouponList({ giftDataObj: res__ });
                props.setAppbar.handleSetLoading(false);
            });
    };

    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("クーポン一覧");
        props.setAppbar.rightIcon(<></>);
        refreshCards();
    }, []);


    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "60px" }}>
            <Box>
                {createdGiftsObj}
            </Box>
            <MyDialog
                titleText="本当に使用しますか？"
                contentText="回数券の場合は使用すると回数が１減ります。"
                agreeButtonText="使用"
                disagreeButtonText="取り消し"
                confDiagOpen={useConfDiagOpen}
                handleOk={handleUse}
                handleCancel={suseConfDiagOpen}
            />
            <MyDialog
                titleText="本当に削除しますか？"
                contentText="削除すると戻すことができません。"
                agreeButtonText="削除"
                disagreeButtonText="取り消し"
                confDiagOpen={deleteConfDiagOpen}
                handleOk={handleDelete}
                handleCancel={sdeleteConfDiagOpen}
            />
        </Box>
    );
}
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CouponCard from './myCard';
import React, { useEffect, useState } from 'react';
import MyDialog from './MyDialog';
import ShareIcon from '@material-ui/icons/Share';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';


interface ICouponProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function Coupon(props: ICouponProps) {


    const [useConfDiagOpen, suseConfDiagOpen] = useState(false);
    const [deleteConfDiagOpen, sdeleteConfDiagOpen] = useState(false);



    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("クーポン一覧");
        props.setAppbar.rightIcon(<></>);
    }, []);


    return (
        <Box style={{ display: "flex", justifyContent: "center",paddingBottom:"60px" }}>
            <Box>
                <CouponCard
                    title="肩たたき券"
                    subheader="2021/3/1まで  残り3回"
                    avatar="S"
                    image="/none.png"
                    message="敬老感謝の日にプレゼント"
                    hash="114514"
                    leftIcon={
                        <IconButton aria-label="use" onClick={() => { suseConfDiagOpen(true) }}>
                            <CheckIcon />
                        </IconButton>
                    }
                    rightIcon={
                        <IconButton aria-label="delete" onClick={() => { sdeleteConfDiagOpen(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                />
                <CouponCard
                    title="肩たたき券"
                    subheader="2021/3/1まで  残り3回"
                    avatar="S"
                    image="/none.png"
                    message="敬老感謝の日にプレゼント"
                    hash="114514"
                    leftIcon={
                        <IconButton aria-label="use" onClick={() => { suseConfDiagOpen(true) }}>
                            <CheckIcon />
                        </IconButton>
                    }
                    rightIcon={
                        <IconButton aria-label="delete" onClick={() => { sdeleteConfDiagOpen(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                />
                <CouponCard
                    title="肩たたき券"
                    subheader="2021/3/1まで  残り3回"
                    avatar="S"
                    image="/none.png"
                    message="敬老感謝の日にプレゼント"
                    hash="114514"
                    leftIcon={
                        <IconButton aria-label="use" onClick={() => { suseConfDiagOpen(true) }}>
                            <CheckIcon />
                        </IconButton>
                    }
                    rightIcon={
                        <IconButton aria-label="delete" onClick={() => { sdeleteConfDiagOpen(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                />
                <CouponCard
                    title="肩たたき券"
                    subheader="2021/3/1まで  残り3回"
                    avatar="S"
                    image="/none.png"
                    message="敬老感謝の日にプレゼント"
                    hash="114514"
                    leftIcon={
                        <IconButton aria-label="use" onClick={() => { suseConfDiagOpen(true) }}>
                            <CheckIcon />
                        </IconButton>
                    }
                    rightIcon={
                        <IconButton aria-label="delete" onClick={() => { sdeleteConfDiagOpen(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                />
                <CouponCard
                    title="肩たたき券"
                    subheader="2021/3/1まで  残り3回"
                    avatar="S"
                    image="/none.png"
                    message="敬老感謝の日にプレゼント"
                    hash="114514"
                    leftIcon={
                        <IconButton aria-label="use" onClick={() => { suseConfDiagOpen(true) }}>
                            <CheckIcon />
                        </IconButton>
                    }
                    rightIcon={
                        <IconButton aria-label="delete" onClick={() => { sdeleteConfDiagOpen(true) }}>
                            <DeleteIcon />
                        </IconButton>
                    }
                />
            </Box>
            <MyDialog
                titleText="本当に使用しますか？"
                contentText="回数券の場合は使用すると回数が１減ります。"
                agreeButtonText="使用"
                disagreeButtonText="取り消し"
                confDiagOpen={useConfDiagOpen}
                sconfDiagOpen={suseConfDiagOpen}
            />
            <MyDialog
                titleText="本当に削除しますか？"
                contentText="削除すると戻すことができません。"
                agreeButtonText="削除"
                disagreeButtonText="取り消し"
                confDiagOpen={deleteConfDiagOpen}
                sconfDiagOpen={sdeleteConfDiagOpen}
            />
        </Box>
    );
}
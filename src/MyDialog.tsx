import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';


interface IMyDialogProps{
    titleText:string;
    contentText:string;
    confDiagOpen:boolean;
    handleOk:(open:boolean) => void;
    handleCancel:(open:boolean) => void;
    disagreeButtonText:string;
    agreeButtonText:string;
}


export default function MyDialog(props:IMyDialogProps) {



    /* ダイアログのコンポーネント化 */
    return (
            <Dialog
                open={props.confDiagOpen}
                onClose={()=>{props.handleCancel(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <InfoIcon style={{marginBottom:"-5px",marginRight:"10px"}}/>
                    {props.titleText}
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{props.handleOk(false);}} color="primary">{props.agreeButtonText}</Button>
                    <Button onClick={()=>{props.handleCancel(false);}} color="primary" autoFocus>{props.disagreeButtonText}</Button>
                </DialogActions>
            </Dialog>
    );
}
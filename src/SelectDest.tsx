import { Box, FormControl, IconButton, List, ListItem, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';


interface IDestListItem{
    destName:string;
}


function DestListItem(props:IDestListItem){


    let history = useHistory();

    return(
        <ListItem button onClick={()=>{
                history.push({
                    pathname:"/createnew",
                    state:{destName:props.destName}
                });
            }}>
            <ListItemText primary={props.destName} />
        </ListItem>
    );
}


interface ISelectDestProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}

export default function SelectDest(props: ISelectDestProps) {


    let history = useHistory();


    const [destk, sdestk] = useState<any>(0);


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
        props.setAppbar.centerTitle("配布先選択");
        props.setAppbar.rightIcon(<></>);
    }, []);


    return (
        <Box style={{ display: "flex",flexDirection:"column",paddingBottom:"70px" }}>
            <FormControl variant="filled" style={{ marginTop:"10px",width: "100%"}}>
                <Select value={destk} onChange={event => { sdestk(event.target.value) }}>
                    <MenuItem value={0}>個人</MenuItem>
                    <MenuItem value={1}>グループ</MenuItem>
                </Select>
            </FormControl>
            <List style={{border:"1px solid #909090",borderRadius:10,padding:"10px", marginTop:"40px"}}>
                {
                    (()=>{
                        let dests:JSX.Element[] = [];
                        for(let i=0;i<100;i++){
                            dests.push(<DestListItem destName="なんとかさん" />);
                        }
                        return dests;
                    })()
                }
            </List>
        </Box>
    );
}
import { useEffect } from 'react';
import { Box, Button, Link, List, Typography } from '@material-ui/core';
import React from 'react';


interface IListItem{
    value:number;
}


function ListItem(props:IListItem){


    const [checked, setChecked] = React.useState([0]);


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

      
    return (
        <ListItem key={props.value} role={undefined} dense button onClick={handleToggle(value)}>

        </ListItem>
    );
}


interface ISelectUserProps {
    setAppbar: {
        leftIcon: (icon: JSX.Element) => void,
        centerTitle: (title: string) => void;
        rightIcon: (icon: JSX.Element) => void;
    };
}


export default function SelectUser(props: ISelectUserProps) {
    useEffect(() => {
        props.setAppbar.leftIcon(<></>);
        props.setAppbar.centerTitle("設定");
        props.setAppbar.rightIcon(<></>);
    }, []);
    return (
        <Box style={{ display: "flex", justifyContent: "center", paddingBottom: "60px" }}>
            <Box style={{ width: "90vw", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3vh" }}>
                <List>
                    
                </List>
            </Box>
        </Box>
    );
}
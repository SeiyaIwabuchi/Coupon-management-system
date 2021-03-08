import { Typography, Box, CircularProgress } from "@material-ui/core";

//読み込み時などオーバーレイ
function Loading(props:{
    isShow:boolean
}){
    return (
    <Box style={{ 
        position:"fixed",
        left:0,
        top:0,
        width:"100%",
        height:"100%",
        background:"#646464",
        opacity:0.8,
        zIndex:10000,
        display:props.isShow?"flex":"none",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        }}>
            <Typography variant="h5" style={{color:"white",marginBottom:"20px"}}>お待ちください。</Typography>
            <CircularProgress color="secondary"/>
    </Box>
    );
}
export default Loading;
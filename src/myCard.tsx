import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "90vw",
		margin: "2vh",
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

interface ICouponCard {
	title: string;
	subheader: string;
	avatar: string;
	image: string;
	message: string;
	hash: number;
	leftIcon:JSX.Element;
	rightIcon:JSX.Element;
}

export default function CouponCard(props: ICouponCard) {
	const classes = useStyles();


	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="coupon" className={classes.avatar}>
						{props.avatar}
					</Avatar>
				}
				title={props.title}
				subheader={props.subheader}
			/>
			<CardMedia
				className={classes.media}
				image={props.image}
				title="coupon"
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.message}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{props.leftIcon}
				{props.rightIcon}
			</CardActions>
		</Card>
	);
}
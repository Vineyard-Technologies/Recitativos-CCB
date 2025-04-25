import React from "react";
import {Container, EmptyIcon, IconProvider, Title} from "@components/NavBar/style";
import {TouchableOpacity} from "react-native";

type Props = {
	title: string;
	leftIcon?: React.ReactNode;
	leftOnPress?: () => void;
	rightIcon?: React.ReactNode;
	rightOnPress?: () => void;
}

export default function NavBar(
	{
		leftIcon,
		leftOnPress,
		rightIcon,
		rightOnPress,
		title
	}: Props) {
	return (
		<Container>
			<IconProvider value={{}}>
				{!!leftIcon ?
					<TouchableOpacity
						onPress={leftOnPress}
					>
						{leftIcon}
					</TouchableOpacity>
					: <EmptyIcon/>
				}
				<Title>{title}</Title>
				{!!rightIcon ?
					<TouchableOpacity
						onPress={rightOnPress}
					>
						{rightIcon}
					</TouchableOpacity>
					: <EmptyIcon/>
				}
			</IconProvider>
		</Container>
	);
}

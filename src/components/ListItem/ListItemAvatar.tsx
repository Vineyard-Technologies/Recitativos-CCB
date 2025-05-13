import styled from "styled-components/native";
import {ImageSourcePropType} from "react-native/Libraries/Image/Image";

export type ListItemAvatarProps = {
	avatar: ImageSourcePropType;
}

export default function ListItemAvatar({avatar}: ListItemAvatarProps) {
	return (
		<Avatar source={avatar} alt="Avatar"/>
	);
}

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
`;

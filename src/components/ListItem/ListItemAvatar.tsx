import styled from "styled-components/native";
import {ImageSourcePropType} from "react-native/Libraries/Image/Image";

/**
 * Propriedades para o avatar do item da lista.
 * @typedef {Object} ListItemAvatarProps
 * @property {ImageSourcePropType} avatar - Fonte da imagem do avatar.
 */
export type ListItemAvatarProps = {
	avatar: ImageSourcePropType;
}

/**
 * Componente que exibe o avatar de um item da lista.
 * @param {ListItemAvatarProps} props - Propriedades do componente.
 * @returns {JSX.Element} Elemento React com o avatar.
 */
export default function ListItemAvatar({avatar}: ListItemAvatarProps) {
	return (
		<Avatar source={avatar} alt="Avatar"/>
	);
}

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
`;

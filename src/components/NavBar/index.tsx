import React from "react";
import {Container, EmptyIcon, IconProvider, Title} from "@components/NavBar/style";
import {TouchableOpacity} from "react-native";

/**
 * Propriedades para o componente NavBar.
 * @typedef {Object} Props
 * @property {string} title - Título da barra de navegação.
 * @property {React.ReactNode} [leftIcon] - Ícone à esquerda.
 * @property {() => void} [leftOnPress] - Função chamada ao pressionar o ícone da esquerda.
 * @property {React.ReactNode} [rightIcon] - Ícone à direita.
 * @property {() => void} [rightOnPress] - Função chamada ao pressionar o ícone da direita.
 */

type Props = {
	title: string;
	leftIcon?: React.ReactNode;
	leftOnPress?: () => void;
	rightIcon?: React.ReactNode;
	rightOnPress?: () => void;
}

/**
 * Componente de barra de navegação customizada.
 * @param {Props} props - Propriedades do componente.
 * @returns {JSX.Element} Elemento React da barra de navegação.
 */
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

import styled, {css} from "styled-components/native";
import {TouchableOpacity} from "react-native";
import {ReactNode} from "react";

/**
 * Propriedades para o componente raiz do item da lista.
 * @typedef {Object} ContainerProps
 * @property {ReactNode} children - Elementos filhos a serem renderizados.
 * @property {boolean} selected - Indica se o item está selecionado.
 */
type ContainerProps = {
	children: ReactNode;
	selected: boolean;
};

/**
 * Componente raiz do item da lista, responsável pelo layout e seleção.
 * @param {ContainerProps} props - Propriedades do componente.
 * @returns {JSX.Element} Elemento React do item da lista.
 */
export default function ListItemRoot({children, selected}: ContainerProps) {
	return (
		<TouchableOpacity>
			<Container selected={selected}>
				{children}
			</Container>
		</TouchableOpacity>
	);
}

const Container = styled.View<ContainerProps>`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 16px;
    ${({theme, selected}) => css`
        background-color: ${selected ? theme.COLORS.HIGHLIGHT_LIGHT_INVERSE : theme.COLORS.NEUTRAL_LIGHT_DARK};
    `}
`;

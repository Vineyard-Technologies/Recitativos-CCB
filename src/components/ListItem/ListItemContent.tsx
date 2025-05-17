import styled, {css} from "styled-components/native";

/**
 * Propriedades para o conteúdo do item da lista.
 * @typedef {Object} ListItemContentProps
 * @property {string} title - Título do item.
 * @property {string} [description] - Descrição opcional do item.
 * @property {boolean} [danger] - Indica se o item está em estado de alerta.
 */

type ListItemContentProps = {
	title: string;
	description?: string;
	danger?: boolean;
}

/**
 * Componente que exibe o conteúdo textual de um item da lista.
 * @param {ListItemContentProps} props - Propriedades do componente.
 * @returns {JSX.Element} Elemento React com título e descrição.
 */
export default function ListItemContent({title, description, danger}: ListItemContentProps) {
	return (
		<Container>
			<Title danger={danger}>{title}</Title>
			{description &&
          <Description danger={danger}>{description}</Description>
			}
		</Container>
	);
}
const Container = styled.View`
    flex: 1;
    gap: 4px;
`;

const Title = styled.Text<Partial<ListItemContentProps>>`
    ${({theme, danger}) => css`
        ${theme.BODY.M};
        color: ${danger ? theme.COLORS.ERROR_DARK : theme.COLORS.NEUTRAL_DARK_DARKEST};
    `}
`;

const Description = styled.Text<Partial<ListItemContentProps>>`
    ${({theme, danger}) => css`
        ${theme.BODY.S};
        color: ${danger ? theme.COLORS.ERROR_DARK : theme.COLORS.NEUTRAL_DARK_DARKEST};
    `}
`;

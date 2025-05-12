import styled, {css} from "styled-components/native";

type ListItemContentProps = {
	title: string;
	description?: string;
	danger?: boolean;
}

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
        color: ${danger ? theme.COLORS.ERROR_DARK : theme.COLORS.NEUTRAL_DARK_LIGHT};
    `}
`;

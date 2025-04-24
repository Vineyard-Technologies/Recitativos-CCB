import styled, {css} from "styled-components/native";
import {IconContext} from "phosphor-react-native";

export const Container = styled.View`
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
    height: 60px;
    padding: 15px 24px;
`;

export const Title = styled.Text`
    ${({theme}) => css`
        ${theme.HEADING.H3};
        color: ${theme.COLORS.NEUTRAL_DARK_DARKEST}
    `}
`;

export const IconProvider = styled(IconContext.Provider).attrs(({theme}) => ({
	value: {
		color: theme.COLORS.HIGHLIGHT_DARKEST,
		size: 30,
		weight: 'bold'
	},
}))``;

export const EmptyIcon = styled.View`
		width: 30px;
		height: 30px;
`;

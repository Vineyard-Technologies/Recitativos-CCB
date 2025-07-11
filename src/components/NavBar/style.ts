import styled, {css} from "styled-components/native";
import {IconContext} from "phosphor-react-native";

export const Container = styled.View`
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
    min-height: 60px;
    padding: 15px 24px;
`;

export const Title = styled.Text`
    ${({theme}) => css`
        ${theme.HEADING.H1};
        color: ${theme.COLORS.NEUTRAL_DARK_DARKEST};
        include-font-padding: false;
        padding-vertical: 0;
        text-align-vertical: center;
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

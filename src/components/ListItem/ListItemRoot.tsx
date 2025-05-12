import styled, {css} from "styled-components/native";
import {TouchableOpacity} from "react-native";
import {ReactNode} from "react";

type ContainerProps = {
	children: ReactNode;
	selected: boolean;
}

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
        background-color: ${selected ? theme.COLORS.HIGHLIGHT_LIGHTEST_INVERSE : theme.COLORS.NEUTRAL_LIGHT_LIGHTEST};
    `}
`;

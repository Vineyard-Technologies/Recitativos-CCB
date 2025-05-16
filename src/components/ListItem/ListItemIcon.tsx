import {CaretRight, Check, IconContext} from "phosphor-react-native";
import {ReactNode} from "react";
import styled, {DefaultTheme} from "styled-components/native";

/**
 * Propriedades para o ícone do item da lista.
 * @typedef {Object} ProviderProps
 * @property {'left'|'right'} side - Lado do ícone.
 * @property {boolean} [selected] - Indica se o item está selecionado.
 * @property {boolean} [danger] - Indica se o item está em estado de alerta.
 */
type ProviderProps = {
	side: 'left' | 'right';
	selected?: boolean;
	danger?: boolean;
};
/**
 * Propriedades para o componente ListItemIcon.
 * @typedef {ProviderProps & {icon?: ReactNode}} IconProps
 */
type IconProps = ProviderProps & {
	icon?: ReactNode,
};

/**
 * Componente que exibe o ícone do item da lista, à esquerda ou à direita.
 * @param {IconProps} props - Propriedades do componente.
 * @returns {JSX.Element} Elemento React com o ícone.
 */
export default function ListItemIcon({icon, side, selected, danger}: IconProps) {
	return (
			<IconProvider {...{side, selected, danger}} value={{}}>
				{side === 'right'
					? selected ? <Check/> : <CaretRight/>
					: icon}
			</IconProvider>
	);
}

const IconProvider = styled(IconContext.Provider)
	.attrs<ProviderProps>(({theme, side, selected, danger}) => ({
		value: {
			color: colorIcon({side, selected, danger, COLORS: theme.COLORS}),
			size: 20,
			weight: 'bold'
		},
	}))``;

const colorIcon = (
	{side, selected, danger, COLORS}: ProviderProps & Pick<DefaultTheme, 'COLORS'>) => {

	if (side === 'right')
		return selected ? COLORS.HIGHLIGHT_DARKEST_INVERSE : COLORS.NEUTRAL_DARK_LIGHTEST;

	return danger ? COLORS.ERROR_DARK : COLORS.NEUTRAL_DARK_DARKEST
};



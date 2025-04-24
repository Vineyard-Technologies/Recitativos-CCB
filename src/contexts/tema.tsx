import {createContext, ReactNode} from "react";
import {ThemeProvider as ThemeProviderStyledComponent} from "styled-components";
import themeStyle, { COLORS_DARK, COLORS_LIGHT} from '@styles/index';
import {useColorScheme} from "react-native";

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}: {children : ReactNode}) => {
	const currentTheme = {
		...themeStyle,
		COLORS: useColorScheme() === 'dark' ? COLORS_DARK : COLORS_LIGHT,
	};

	return (
		<ThemeContext.Provider value={{}}>
			<ThemeProviderStyledComponent theme={currentTheme}>
				{children}
			</ThemeProviderStyledComponent>
		</ThemeContext.Provider>
	);
}

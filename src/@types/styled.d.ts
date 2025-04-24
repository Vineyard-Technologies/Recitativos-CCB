import "styled-components/native"
import theme from "@styles/index";

type ThemeInterface = typeof theme;
declare module "styled-components/native" {
	interface DefaultTheme extends ThemeInterface {
	}
}

import {css} from "styled-components";

const FONT_FAMILY = {
	BOLD: 'CormorantGaramond-Bold',
	SEMI_BOLD: 'CormorantGaramond-SemiBold',
	REGULAR: 'CormorantGaramond-Regular',
	MEDIUM: 'CormorantGaramond-Medium',
};

export const HEADING = {
	H0: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 38px`,
	H1: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 30px`,
	H2: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 24px`,
	H3: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 22px`,
	H4: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 20px`,
	H5: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 18px`,
};

export const BODY = {
	XL: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 24px`,
	L: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 22px`,
	M: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 20px`,
	S: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 18px`,
	XS: css`font-family: ${FONT_FAMILY.REGULAR};
      font-size: 16px`,
};

export const ACTION = {
	L: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 20px`,
	M: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 18px`,
	S: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 16px`,
};

export const CAPTION = {
	M: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 16px`,
};

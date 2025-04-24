import {css} from "styled-components";

const FONT_FAMILY = {
	BOLD: 'CormorantGaramond-Bold',
	SEMI_BOLD: 'CormorantGaramond-SemiBold',
	REGULAR: 'CormorantGaramond-Regular',
	MEDIUM: 'CormorantGaramond-Medium',
};

export const HEADING = {
	H0: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 32px`,
	H1: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 24px`,
	H2: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 18px`,
	H3: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 16px`,
	H4: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 14px`,
	H5: css`font-family: ${FONT_FAMILY.BOLD};
      font-size: 12px`,
};

export const BODY = {
	XL: css`font-family: ${FONT_FAMILY.REGULAR};
      font-size: 18px`,
	L: css`font-family: ${FONT_FAMILY.REGULAR};
      font-size: 16px`,
	M: css`font-family: ${FONT_FAMILY.REGULAR};
      font-size: 14px`,
	S: css`font-family: ${FONT_FAMILY.REGULAR};
      font-size: 12px`,
	XS: css`font-family: ${FONT_FAMILY.MEDIUM};
      font-size: 10px`,
};

export const ACTION = {
	L: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 14px`,
	M: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 12px`,
	S: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 10px`,
};

export const CAPTION = {
	M: css`font-family: ${FONT_FAMILY.SEMI_BOLD};
      font-size: 10px`,
};

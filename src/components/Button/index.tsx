import React from "react";
import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

/**
 * Propriedades para o componente Button.
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} [icon] - Ícone opcional exibido no botão.
 * @property {string} label - Texto do botão.
 * @property {"left"|"right"} [position] - Posição do botão na tela.
 */
interface ButtonProps extends TouchableOpacityProps {
  icon?: React.ReactNode;
  label: string;
  position?: "left" | "right";
}

const ButtonContainer = styled.TouchableOpacity<{ position?: "left" | "right" }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.COLORS.HIGHLIGHT_DARKEST};
  position: absolute;
  bottom: 32px;
  ${({ position }) =>
    position === "left"
      ? "left: 24px;"
      : position === "right"
      ? "right: 24px;"
      : ""}
  elevation: 4;
`;

const ButtonLabel = styled.Text`
    ${({ theme }) => theme.ACTION.M};
    color: #fff;
    margin-left: 8px;
`;

/**
 * Componente de botão customizado.
 * @param {ButtonProps} props - Propriedades do botão.
 * @returns {JSX.Element} Elemento React do botão.
 */
const Button: React.FC<ButtonProps> = ({ icon, label, position, ...props }) => (
  <ButtonContainer activeOpacity={0.8} position={position} {...props}>
    {icon}
    <ButtonLabel>{label}</ButtonLabel>
  </ButtonContainer>
);

export default Button;

import ListItemAvatar, {
  ListItemAvatarProps,
} from "@components/ListItem/ListItemAvatar";
import ListItemRoot from "@components/ListItem/ListItemRoot";
import ListItemIcon from "@components/ListItem/ListItemIcon";
import ListItemContent from "@components/ListItem/ListItemContent";
import { ReactNode } from "react";

export type VariantTypesProps = "Icon" | "Avatar" | "None";

/**
 * Propriedades do componente ListItemComponent.
 */
export type ListItemProps = ListItemAvatarProps & {
  type: VariantTypesProps;
  title: string;
  description?: string;
  leftIcon?: ReactNode;
  hasRightIcon?: boolean;
  selected?: boolean;
  danger?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  memorizationPercentage?: number;
};

/**
 * Componente de item de lista que pode exibir diferentes variantes (ícone, avatar ou nenhum).
 * @param {ListItemProps} props - Propriedades do componente.
 * @param {"Icon"|"Avatar"|"None"} props.type - Tipo de variante do item.
 * @param {string} props.title - Título do item.
 * @param {string} [props.description] - Descrição opcional do item.
 * @param {ReactNode} [props.leftIcon] - Ícone à esquerda.
 * @param {boolean} [props.hasRightIcon] - Se deve exibir ícone à direita.
 * @param {boolean} [props.selected] - Se o item está selecionado.
 * @param {boolean} [props.danger] - Se o item está em estado de alerta.
 * @param {any} [props.avatar] - Avatar do item (quando aplicável).
 * @returns {JSX.Element} Elemento React do item de lista.
 */
export default function ListItemComponent({
  type,
  title,
  description,
  avatar,
  leftIcon,
  hasRightIcon,
  selected = false,
  danger = false,
  onPress,
  onLongPress,
  memorizationPercentage,
}: ListItemProps) {
  const theme = useTheme();
  switch (type) {
    case "Icon":
      return (
        <ListItemRoot
          selected={selected}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <ListItemIcon icon={leftIcon} side="left" danger={danger} />
          <ListItemContent {...{ title, description, danger }} />
          {typeof memorizationPercentage === 'number' && (
            <MemorizationPercentage
              color={
                memorizationPercentage <= 40 ? theme.COLORS.ERROR_MEDIUM :
                memorizationPercentage <= 79 ? theme.COLORS.WARNING_MEDIUM :
                theme.COLORS.SUCCESS_MEDIUM
              }
            >
              {memorizationPercentage}%
            </MemorizationPercentage>
          )}
          {hasRightIcon && <ListItemIcon side="right" selected={selected} />}
        </ListItemRoot>
      );
    case "Avatar":
      return (
        <ListItemRoot
          selected={selected}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <ListItemAvatar avatar={avatar} />
          <ListItemContent {...{ title, description, danger }} />
          {typeof memorizationPercentage === 'number' && (
            <MemorizationPercentage
              color={
                memorizationPercentage <= 40 ? theme.COLORS.ERROR_MEDIUM :
                memorizationPercentage <= 79 ? theme.COLORS.WARNING_MEDIUM :
                theme.COLORS.SUCCESS_MEDIUM
              }
            >
              {memorizationPercentage}%
            </MemorizationPercentage>
          )}
          {hasRightIcon && <ListItemIcon selected={selected} side="right" />}
        </ListItemRoot>
      );

    default:
      return (
        <ListItemRoot
          selected={selected}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <ListItemContent {...{ title, description, danger }} />
          {typeof memorizationPercentage === 'number' && (
            <MemorizationPercentage
              color={
                memorizationPercentage <= 40 ? theme.COLORS.ERROR_MEDIUM :
                memorizationPercentage <= 79 ? theme.COLORS.WARNING_MEDIUM :
                theme.COLORS.SUCCESS_MEDIUM
              }
            >
              {memorizationPercentage}%
            </MemorizationPercentage>
          )}
          {hasRightIcon && <ListItemIcon side="right" selected={selected} />}
        </ListItemRoot>
      );
  }

}

import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';

const MemorizationPercentage = styled.Text<{ color: string }>`
  font-weight: bold;
  color: ${({ color }) => color};
  margin-right: 8px;
`;

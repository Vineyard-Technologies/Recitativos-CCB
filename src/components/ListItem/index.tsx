import ListItemAvatar, {
  ListItemAvatarProps,
} from "@components/ListItem/ListItemAvatar";
import ListItemRoot from "@components/ListItem/ListItemRoot";
import ListItemIcon from "@components/ListItem/ListItemIcon";
import ListItemContent from "@components/ListItem/ListItemContent";
import { ReactNode } from "react";

export type VariantTypesProps = "Icon" | "Avatar" | "None";
export type ListItemProps = ListItemAvatarProps & {
  type: VariantTypesProps;
  title: string;
  description?: string;
  leftIcon?: ReactNode;
  hasRightIcon?: boolean;
  selected?: boolean;
  danger?: boolean;
};

export default function ListItemComponent({
  type,
  title,
  description,
  avatar,
  leftIcon,
  hasRightIcon,
  selected = false,
  danger = false,
}: ListItemProps) {
  switch (type) {
    case "Icon":
      return (
        <ListItemRoot selected={selected}>
          <ListItemIcon icon={leftIcon} side="left" danger={danger} />
          <ListItemContent {...{ title, description, danger }} />
          {hasRightIcon && <ListItemIcon side="right" selected={selected} />}
        </ListItemRoot>
      );
    case "Avatar":
      return (
        <ListItemRoot selected={selected}>
          <ListItemAvatar avatar={avatar} />
          <ListItemContent {...{ title, description, danger }} />
          {hasRightIcon && <ListItemIcon selected={selected} side="right" />}
        </ListItemRoot>
      );

    default:
      return (
        <ListItemRoot selected={selected}>
          <ListItemContent {...{ title, description, danger }} />
          {hasRightIcon && <ListItemIcon side="right" selected={selected} />}
        </ListItemRoot>
      );
  }
}

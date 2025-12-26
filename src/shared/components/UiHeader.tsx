import {
  Divider,
  Group,
  Paper,
  ThemeIcon,
  Title,
  type TitleOrder,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../store/store";

export interface IUiHeader {
  title?: React.ReactNode;
  order?: TitleOrder;
  withDivider?: boolean;
  history?: string;
  withBackButton?: boolean;
  rightSection?: ReactElement | null;
  withShadow?: boolean;
}

const UiHeader = () => {
  const navigate = useNavigate();
  const { showHeader, subHeader } = useAppSelector((state) => state.appSlice);

  return (
    !showHeader && (
      <Paper bg={"white"} mx={"-md"} shadow={subHeader.withShadow ? "sm" : ""}>
        <Group p={"sm"} py={"md"} align="center">
          {subHeader.withBackButton && (
            <ThemeIcon
              h={"100%"}
              color="gray.6"
              variant="transparent"
              onClick={() =>
                subHeader?.history ? navigate(subHeader.history) : navigate(-1)
              }
            >
              <IconArrowLeft size={24} />
            </ThemeIcon>
          )}
          <Title order={subHeader.order} c={"dark"} fw={500}>
            {subHeader.title}
          </Title>
          {subHeader.rightSection ? (
            <Group ms={"auto"}>{subHeader.rightSection}</Group>
          ) : null}
        </Group>
        {subHeader.withDivider && <Divider mx={"-md"} />}
      </Paper>
    )
  );
};

export default UiHeader;

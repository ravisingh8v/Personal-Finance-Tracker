import {
  ActionIcon,
  Badge,
  Divider,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { MENU_LINKS } from "../../../shared/utility/constants/constants";
import { TRANSACTION_NATURE } from "../../../shared/utility/enum/enums";
import {
  formatAmount,
  formatUtcToRelativeTime,
} from "../../../shared/utility/helper/helper";
import type { IExpenseItem } from "../../../shared/utility/model/model";

const ExpenseItem = ({ expense }: { expense: IExpenseItem }) => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const isIncome = expense?.transactionType.id === TRANSACTION_NATURE.INCOME;
  return (
    <Paper radius={"md"} py={"md"} pb={0} px={"md"}>
      <Group justify="space-between">
        {/* Left Section  */}
        <Group gap={12} flex={1}>
          <Stack gap={8}>
            <Group gap={4}>
              <Badge
                variant="light"
                c={expense?.category?.colorCode}
                tt={"capitalize"}
                radius={"sm"}
              >
                {expense?.category?.name}
              </Badge>
              <Badge variant="light" tt={"capitalize"} radius={"sm"}>
                {expense?.paymentType?.name}
              </Badge>
            </Group>
            <Text fz={"sm"} style={{ wordBreak: "break-word" }} lineClamp={2}>
              {expense?.notes}
            </Text>
          </Stack>
        </Group>

        {/* Right Section  */}
        <Group
          gap={0}
          w={expense?.amount.toString().length > 7 ? "50%" : "40%"}
          justify="end"
          me={"-4"}
        >
          <Text
            c={isIncome ? "green" : "red"}
            ta={"right"}
            fw={500}
            style={{ flexGrow: 1 }}
            truncate
          >
            {isIncome ? "+" : "-"}
            {formatAmount(expense?.amount, 0, 2)}
          </Text>

          {/* Menu  */}
          <Menu shadow="sm">
            <Menu.Target>
              <ActionIcon
                variant="transparent"
                color="brand"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                <IconDotsVertical stroke={2.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
              <Menu.Item
                onClick={() =>
                  navigate(
                    MENU_LINKS.BOOK +
                      `/${id}` +
                      MENU_LINKS.EXPENSES +
                      MENU_LINKS.EXPENSE_EDIT +
                      `/${expense.id}`
                  )
                }
              >
                <Group gap={8}>
                  <ThemeIcon variant="transparent" size={"sm"}>
                    <IconPencil size={18} />
                  </ThemeIcon>
                  <Text fz={"sm"}>Edit</Text>
                </Group>
              </Menu.Item>
              <Menu.Item
                color="red"
                // onClick={() => setIsConfirmation(true)}
              >
                <Group gap={8}>
                  <ThemeIcon variant="transparent" color="red" size={"sm"}>
                    <IconTrash size={18} />
                  </ThemeIcon>
                  <Text fz={"sm"}>Delete</Text>
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <Divider mt={"sm"} my={0} mx={"-md"}></Divider>
      <Text c={"dimmed"} fz={"xs"} my={"8px"}>
        Entry Time : {formatUtcToRelativeTime(expense?.date)}
      </Text>
      {/* {idx < expenses.length - 1 && <Divider mx={"-md"} />} */}
    </Paper>
  );
};

export default ExpenseItem;

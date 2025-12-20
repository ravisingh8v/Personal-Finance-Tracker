import {
  ActionIcon,
  Badge,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { APP_SLICE_INITIAL_VALUES } from "../../shared/utility/constants/constants";
import { TRANSACTION_NATURE } from "../../shared/utility/enum/enums";
import {
  formatAmount,
  formatUtcToRelativeTime,
} from "../../shared/utility/helper/helper";
import useGlobalBgColor from "../../shared/utility/hooks/useGlobalBgColor";
import useHideHeader from "../../shared/utility/hooks/useHideHeader";
import type { IExpenseRes } from "../../shared/utility/model/model";
import { useGetExpensesQuery } from "../../shared/utility/service/expense.service";
import { setSubHeader } from "../../shared/utility/slice/app.slice";
import ExpenseSummary from "./components/ExpenseSummary";

const Expenses = () => {
  useHideHeader();
  useGlobalBgColor("brand.0");
  const dispatch = useDispatch();

  const { id = "" } = useParams();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const { data: { book, expenses, summary } = {} as IExpenseRes, isLoading } =
    useGetExpensesQuery(+id, {
      skip: id === "",
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    if (book) {
      dispatch(
        setSubHeader({
          title: book.name,
          order: 4,
          history: "/",
          withDivider: true,
        })
      );
    }

    return () => {
      dispatch(setSubHeader(APP_SLICE_INITIAL_VALUES.subHeader));
    };
  }, [book]);

  return (
    <>
      <Flex h={"100%"} gap={0} direction={"column"}>
        <Stack gap={16} flex={1} mt={"sm"}>
          <ExpenseSummary summary={summary} />
          {/* <Skeleton visible={!isLoading} height={100} /> */}

          <Text ta={"center"}>
            <Divider
              color="gray.4"
              styles={{ label: { fontSize: "12px" } }}
              label={"Showing " + summary?.totalEntries + " entires"}
            ></Divider>
          </Text>
          {/* <Card withBorder radius={"md"}> */}
          {/* <Card.Section px={"md"} py={"xs"} withBorder>
              <Group justify="space-between">
                <Text c={"dark"} fw={500}>
                  Transactions
                </Text>
              </Group>
            </Card.Section> */}
          {/* <Card.Section px={"md"}> */}
          <Stack gap={8}>
            {expenses && expenses?.length > 0
              ? expenses.map((expn, idx) => {
                  const isIncome =
                    expn.transactionType.id === TRANSACTION_NATURE.INCOME;
                  return (
                    <Paper radius={"md"} py={"md"} pb={0} px={"md"}>
                      <Group justify="space-between">
                        {/* Left Section  */}
                        <Group gap={12} flex={1}>
                          {/* <ThemeIcon
                            variant="light"
                            size={"md"}
                            color={isIncome ? "green" : "red"}
                          >
                            {isIncome ? (
                              <IconTrendingUp size={18} />
                            ) : (
                              <IconTrendingDown size={18} />
                            )}
                          </ThemeIcon> */}
                          <Stack gap={2}>
                            <Badge
                              variant="light"
                              tt={"capitalize"}
                              radius={"sm"}
                            >
                              {expn.category.name}
                            </Badge>
                            <Text
                              fz={"sm"}
                              style={{ wordBreak: "break-word" }}
                              lineClamp={2}
                            >
                              {expn.notes} sfiljsif sfkjskf sfkjskf
                              sfkjsfjskjkjksfjskf
                            </Text>
                          </Stack>
                        </Group>
                        {/* Right Section  */}
                        <Group
                          gap={0}
                          w={expn.amount.toString().length > 7 ? "50%" : "40%"}
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
                            {formatAmount(expn.amount, 0, 2)}
                          </Text>
                          <ActionIcon variant="transparent" size={"sm"}>
                            <IconDotsVertical />
                          </ActionIcon>
                        </Group>
                      </Group>
                      <Divider mt={"md"} my={0} mx={"-md"}></Divider>
                      <Text c={"dimmed"} fz={"xs"} my={"8px"}>
                        Entry Time : {formatUtcToRelativeTime(expn.date)}
                      </Text>
                      {/* {idx < expenses.length - 1 && <Divider mx={"-md"} />} */}
                    </Paper>
                  );
                })
              : null}
          </Stack>
          {/* </Card.Section> */}
          {/* </Card> */}
        </Stack>
      </Flex>
    </>
  );
};

export default Expenses;

import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { Fragment, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import {
  APP_SLICE_INITIAL_VALUES,
  MENU_LINKS,
} from "../../shared/utility/constants/constants";
import { TRANSACTION_NATURE } from "../../shared/utility/enum/enums";
import useGlobalBgColor from "../../shared/utility/hooks/useGlobalBgColor";
import useHideBottomBar from "../../shared/utility/hooks/useHideBottomBar";
import useHideHeader from "../../shared/utility/hooks/useHideHeader";
import type {
  IExpenseItem,
  IExpenseRes,
} from "../../shared/utility/model/model";
import { useGetExpensesQuery } from "../../shared/utility/service/expense.service";
import { setSubHeader } from "../../shared/utility/slice/app.slice";
import ExpenseItem from "./components/ExpenseItem";
import ExpenseSummary from "./components/ExpenseSummary";

const Expenses = () => {
  useHideHeader();
  useHideBottomBar();
  useGlobalBgColor("brand.0");
  const dispatch = useDispatch();

  const { id = "" } = useParams();
  // const navigate = useNavigate();
  // const theme = useMantineTheme();
  const masterContainer = document.getElementById("master");
  const {
    data: { data: { book, expenses, summary } = {} as IExpenseRes } = {},
    isLoading,
  } = useGetExpensesQuery(+id, {
    skip: id === "",
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (book) {
      dispatch(
        setSubHeader({
          title: book.name ?? "",
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
    masterContainer && (
      <>
        <Flex
          h={"100%"}
          gap={0}
          direction={"column"}
          style={{ overflow: "hidden" }}
        >
          <Stack gap={16} flex={1} style={{ overflow: "auto" }}>
            {!isLoading && summary && <ExpenseSummary summary={summary} />}
            {isLoading && <Skeleton height={120} />}

            {!isLoading && summary?.totalEntries > 0 ? (
              <Text ta={"center"} component="span">
                <Divider
                  color="gray.4"
                  styles={{ label: { fontSize: "12px" } }}
                  label={"Showing " + summary?.totalEntries + " entires"}
                ></Divider>
              </Text>
            ) : null}
            <Stack gap={8} flex={1}>
              {!isLoading && expenses && expenses?.length > 0
                ? expenses.map((expn: IExpenseItem, idx: number) => (
                    <Fragment key={idx}>
                      <ExpenseItem expense={expn} />
                    </Fragment>
                  ))
                : null}

              {isLoading && !expenses?.length
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton key={idx} h={70} />
                  ))
                : null}
            </Stack>
          </Stack>
        </Flex>
        {createPortal(
          <Box
            pos="sticky"
            bg="white"
            style={{ boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)" }}
            mx={"-md"}
            px="md"
            py="md"
          >
            <Group gap={0} justify="space-between">
              <Button
                w={"48%"}
                color={"red"}
                disabled={isLoading}
                component={Link}
                to={{
                  pathname:
                    MENU_LINKS.BOOK +
                    `/${id}` +
                    MENU_LINKS.EXPENSES +
                    MENU_LINKS.EXPENSE_ADD,
                }}
                state={{ transactionTypeId: TRANSACTION_NATURE.EXPENSE }}
              >
                Expense
              </Button>
              <Button
                w={"48%"}
                color="green"
                disabled={isLoading}
                component={Link}
                to={{
                  pathname:
                    MENU_LINKS.BOOK +
                    `/${id}` +
                    MENU_LINKS.EXPENSES +
                    MENU_LINKS.EXPENSE_ADD,
                }}
                state={{ transactionTypeId: TRANSACTION_NATURE.INCOME }}
              >
                Income
              </Button>
            </Group>
          </Box>,
          masterContainer
        )}
      </>
    )
  );
};

export default Expenses;

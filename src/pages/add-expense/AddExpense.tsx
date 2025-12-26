import {
  Button,
  Group,
  InputLabel,
  Loader,
  LoadingOverlay,
  NumberInput,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  APP_SLICE_INITIAL_VALUES,
  MENU_LINKS,
  PaymentModes,
} from "../../shared/utility/constants/constants";
import {
  PAYMENT_NATURE,
  TRANSACTION_NATURE,
} from "../../shared/utility/enum/enums";
import useGlobalBgColor from "../../shared/utility/hooks/useGlobalBgColor";
import useHideBottomBar from "../../shared/utility/hooks/useHideBottomBar";
import useHideHeader from "../../shared/utility/hooks/useHideHeader";
import type {
  IExpense,
  IExpenseReq,
  IReq,
} from "../../shared/utility/model/model";
import {
  useGetExpenseByIdQuery,
  usePostExpenseMutation,
  useUpdateExpenseMutation,
} from "../../shared/utility/service/expense.service";
import { useGetCategoriesQuery } from "../../shared/utility/service/shared.service";
import { setSubHeader } from "../../shared/utility/slice/app.slice";
import { createExpenseSchema } from "./utility/validations/validations";

const AddExpense = () => {
  const { id = "", expenseId = "" } = useParams();
  const navigate = useNavigate();
  useHideHeader();
  useHideBottomBar();
  useGlobalBgColor("brand.0");
  const masterContainer = document.getElementById("master");
  const dispatch = useDispatch();
  const { transactionTypeId } = useLocation()?.state || {};

  const { data: { data: categories } = {}, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const {
    data: { data: expense = {} as IExpense } = {},
    isLoading: isExpenseLoading,
  } = useGetExpenseByIdQuery(
    { bookId: +id, expenseId: +expenseId },
    { skip: !id || !expenseId }
  );

  const [updateExpense, { isLoading: isUpdateExpenseLoading }] =
    useUpdateExpenseMutation();

  const [postExpense, { isLoading: isPostExpenseLoading }] =
    usePostExpenseMutation();

  const form = useForm({
    initialValues: {
      amount: null as number | null,
      notes: "",
      categoryId: 6 as number | null,
      paymentTypeId: PAYMENT_NATURE.CASH,
      transactionTypeId: transactionTypeId
        ? transactionTypeId
        : TRANSACTION_NATURE.EXPENSE,
      transactionDate: new Date(),
    },

    validate: yupResolver(createExpenseSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async () => {
    form.validate();

    if (form.isValid()) {
      const values = form.values;
      const payload: IReq<{ bookId: number }, IExpenseReq> = {
        params: {
          bookId: +id,
        },

        reqBody: {
          amount: values.amount!, // guaranteed now
          notes: values.notes?.trim() || null,
          categoryId: values.categoryId!,
          paymentTypeId: values.paymentTypeId,
          transactionTypeId: values?.transactionTypeId,
          date: values.transactionDate.toISOString(),
        },
      };

      try {
        if (expenseId && expense) {
          // Edit Expense
          const res = await updateExpense({
            ...payload,
            params: { ...payload.params, expenseId: +expenseId },
          });
          if (res?.data?.data) {
            navigate(MENU_LINKS.BOOK + `/${id}` + MENU_LINKS.EXPENSES);
          }
        } else {
          // Add Expense
          const res = await postExpense(payload);
          if (res?.data?.data) {
            navigate(MENU_LINKS.BOOK + `/${id}` + MENU_LINKS.EXPENSES);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (expense) {
      form.setValues({
        amount: expense?.amount ?? 0,
        categoryId: expense?.category?.id ?? 6,
        notes: expense?.notes || "",
        paymentTypeId: expense?.paymentType?.id ?? PAYMENT_NATURE.CASH,
        transactionDate: expense.date ? new Date(expense?.date) : new Date(),
        transactionTypeId: expense?.transactionType?.id || "",
      });

      form.resetDirty();
      form.resetTouched();
    }
  }, [expense]);

  useEffect(() => {
    dispatch(
      setSubHeader({
        title: expenseId ? "Edit Transaction" : "Add Transaction",
        order: 4,
        history: MENU_LINKS.BOOK + `/${id}` + MENU_LINKS.EXPENSES,
        withDivider: true,
      })
    );

    return () => {
      dispatch(setSubHeader(APP_SLICE_INITIAL_VALUES.subHeader));
    };
  }, []);

  return (
    masterContainer && (
      <>
        <LoadingOverlay visible={isExpenseLoading} />
        <Stack>
          <Tabs
            variant="pills"
            p={"md"}
            bg={"white"}
            styles={{
              root: { borderRadius: "var(--mantine-radius-default)" },
              tabLabel: { fontWeight: 500 },
              tab: {
                border: "1px solid var(--mantine-color-gray-3)",
              },
            }}
            defaultValue={form?.values?.transactionTypeId.toString()}
            onChange={(value) =>
              form.setFieldValue("transactionTypeId", value ? +value : null)
            }
          >
            <Tabs.List>
              <Tabs.Tab
                flex={1}
                color="red"
                variant="light"
                value={TRANSACTION_NATURE.EXPENSE.toString()}
              >
                Expense
              </Tabs.Tab>
              <Tabs.Tab
                color="green"
                flex={1}
                value={TRANSACTION_NATURE.INCOME.toString()}
              >
                Income
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Paper p={"md"} mb={"md"}>
            <Stack gap={12}>
              {/* Payment Mode  */}
              <Select
                allowDeselect={false}
                label="Payment Mode"
                placeholder="Select Payment Mode"
                defaultValue={PAYMENT_NATURE.CASH.toString()}
                data={PaymentModes}
                // Reusing your consistent input styling
                styles={{
                  input: {
                    color: "var(--mantine-color-dark-text)",
                  },
                  option: {
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "var(--mantine-color-dark-text)",
                  },
                }}
                checkIconPosition="right"
                {...form.getInputProps("paymentTypeId")}
                value={form.values.paymentTypeId.toString()}
                onChange={(val) =>
                  form.setFieldValue("paymentTypeId", Number(val))
                }

                // leftSectionPointerEvents="none"
                // Optional: Add icons to the dropdown later if you want
              />

              {/* Amount  */}
              <NumberInput
                label="Amount"
                hideControls
                placeholder="Enter Amount"
                {...form.getInputProps("amount")}
              ></NumberInput>

              {/* Note  */}
              <Textarea
                id="note"
                label={
                  <Group gap={4}>
                    <InputLabel htmlFor="note">Note</InputLabel>
                    <InputLabel fz="sm" c={"dimmed"}>
                      (Optional)
                    </InputLabel>
                  </Group>
                }
                rows={3}
                placeholder="Enter Note"
                {...form.getInputProps("notes")}
                resize="vertical"
              ></Textarea>

              {/* Category  */}
              <Select
                pos={"relative"}
                id="category"
                label={
                  <Group w={"100%"} justify="space-between">
                    <InputLabel htmlFor="category">Select Category</InputLabel>
                    <Text
                      c="brand"
                      fz={"14px"}
                      fw={500}
                      pos={"absolute"}
                      right={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      Manage Category
                    </Text>
                  </Group>
                }
                allowDeselect={false}
                placeholder="Select Category"
                styles={{
                  dropdown: {
                    paddingInline: 0,
                  },
                  input: {
                    textTransform: "capitalize",
                    color: "var(--mantine-color-dark-text)",
                  },
                }}
                data={
                  categories && categories?.length
                    ? categories.map((category) => ({
                        label: category.name,
                        value: category.id.toString(),
                        colorCode: category.colorCode,
                      }))
                    : []
                }
                {...form.getInputProps("categoryId")}
                value={form.values.categoryId?.toString()}
                onChange={(val) => {
                  if (val) {
                    form.setFieldValue("categoryId", +val);
                  }
                }}
                renderOption={({ option, checked }: any) => {
                  return (
                    <Group
                      style={{ borderLeft: `4px solid ${option?.colorCode}` }}
                      w={"100%"}
                      justify="space-between"
                      px={"xs"}
                    >
                      <Text c="dark" tt={"capitalize"}>
                        {option.label}
                      </Text>
                      {checked && (
                        <ThemeIcon
                          variant="transparent"
                          color="gray.6"
                          size={"xs"}
                        >
                          <IconCheck stroke={3} />
                        </ThemeIcon>
                      )}
                    </Group>
                  );
                }}
                disabled={isCategoryLoading}
                rightSection={isCategoryLoading ? <Loader size={18} /> : null}
              />
              <DateTimePicker
                label="Transaction Date & Time"
                placeholder="Pick date and time"
                // value={transactionDate}
                // defaultValue={new Date()}
                // onChange={setTransactionDate}
                valueFormat="DD MMM YYYY hh:mm A" // Shows 12-hour format with AM/PM
                maxDate={new Date()} // Prevents future transactions
                dropdownType="modal" // Better for mobile PWA usage
                fz={"16px"}
                styles={{
                  input: {
                    color: "var(--mantine-color-dark-text)",
                  },
                }}
                {...form.getInputProps("transactionDate")}
                value={form.values.transactionDate}
                onChange={(val) => {
                  if (val) {
                    form.setFieldValue("transactionDate", val);
                  }
                }}
              />
            </Stack>
            <Button
              w={"100%"}
              mt={"lg"}
              onClick={handleSubmit}
              loading={isPostExpenseLoading || isUpdateExpenseLoading}
              disabled={
                isCategoryLoading ||
                isPostExpenseLoading ||
                isExpenseLoading ||
                isUpdateExpenseLoading
              }
            >
              Submit
            </Button>
          </Paper>
          {/* {createPortal( */}
          {/* <Group> */}
          {/* <Button>Cancel</Button> */}
          {/* </Group> */}
          {/* masterContainer
        )} */}
        </Stack>
      </>
    )
  );
};

export default AddExpense;

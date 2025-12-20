import {
  Button,
  Flex,
  Group,
  InputLabel,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { APP_SLICE_INITIAL_VALUES } from "../../shared/utility/constants/constants";
import useHideHeader from "../../shared/utility/hooks/useHideHeader";
import type { IBookReq } from "../../shared/utility/model/model";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../shared/utility/service/book.service";
import { setSubHeader } from "../../shared/utility/slice/app.slice";
import { createBookSchema } from "./utility/validations/validations";

const AddBook = () => {
  useHideHeader();
  const dispatch = useDispatch();
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: bookDetails, isLoading: isBookDetailsLoading } =
    useGetBookByIdQuery(+id, {
      skip: id === "",
    });

  const [updateBookDetails, { isLoading: isUpdateLoading }] =
    useUpdateBookMutation();

  const [createBook, { isLoading }] = useAddBookMutation();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: yupResolver(createBookSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  async function handleSubmit() {
    if (form.isValid()) {
      const requestBody: IBookReq = {
        title: form.values.title,
        description: form.values.description || null,
      };
      try {
        if (id) {
          console.log(requestBody);
          const res = await updateBookDetails({
            params: { bookId: +id },
            reqBody: requestBody,
          }).unwrap();

          if (res && typeof res === "string") {
            navigate("/");
          }
        } else {
          const res = await createBook(requestBody).unwrap();
          if (res && res?.id) {
            navigate("/");
          }
        }
      } catch (err) {
        showNotification({
          title: "Error",
          message: `Failed to ${
            id ? "update" : "create"
          } book. Please try again.`,
          color: "red",
        });
        console.error("Failed to create book:", err);
      }
    }
  }

  useEffect(() => {
    if (bookDetails) {
      form.setValues({
        title: bookDetails.title,
        description: bookDetails.description || "",
      });

      form.resetDirty();
      form.resetTouched();
    }

    dispatch(
      setSubHeader({
        title: id ? "Edit Book" : "Create Book",
        order: 4,
        history: "/",
        withDivider: true,
      })
    );
    return () => {
      dispatch(setSubHeader(APP_SLICE_INITIAL_VALUES.subHeader));
    };
  }, [bookDetails]);

  return (
    <>
      <LoadingOverlay visible={isBookDetailsLoading} />
      <Flex h={"100%"} gap={0} direction={"column"}>
        {/* Add Book Form Component can be placed here */}
        <Stack gap={0} flex={1}>
          <Stack flex={1}>
            <TextInput
              placeholder="Enter Book Name"
              label="Book Name"
              {...form.getInputProps("title")}
            ></TextInput>
            <Textarea
              maxRows={4}
              rows={4}
              resize="vertical"
              placeholder="Enter Description"
              label={
                <Group gap={4}>
                  <InputLabel>Description</InputLabel>
                  <InputLabel c="dimmed" fw={400} fz="sm">
                    (Optional)
                  </InputLabel>
                </Group>
              }
              {...form.getInputProps("description")}
            ></Textarea>
          </Stack>

          <Group gap={0} justify="space-between" mb={"2px"}>
            <Button
              w={"48%"}
              variant="outline"
              onClick={() => navigate("/")}
              disabled={isLoading || isUpdateLoading}
              //   size="md"
            >
              Cancel
            </Button>
            <Button
              w={"48%"}
              //   size="md"
              onClick={handleSubmit}
              loading={isLoading || isUpdateLoading}
              disabled={isLoading || isUpdateLoading}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </Flex>
    </>
  );
};

export default AddBook;

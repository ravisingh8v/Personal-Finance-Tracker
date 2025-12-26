import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Skeleton,
  Stack,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconMoodPuzzled, IconPlus, IconSearch } from "@tabler/icons-react";
import { Link } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { MENU_LINKS } from "../../shared/utility/constants/constants";
import { useGetBooksQuery } from "../../shared/utility/service/book.service";
import BookItem from "./components/BookItem";

const Book = () => {
  const { data: { data: books = [] } = {}, isLoading } = useGetBooksQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <Stack
      pos={"relative"}
      gap={0}
      flex={1}
      w={"100%"}
      style={{ overflow: "visible" }}
    >
      {!isLoading && books && books.length > 0 && (
        <Group
          bg={"white"}
          pb={"md"}
          pos={"sticky"}
          justify="space-between"
          top={0}
          bottom={"100%"}
          style={{ zIndex: 1 }}
        >
          <Title c={"dimmed"} fw={500} order={6}>
            Your Books
          </Title>
          <ActionIcon variant="transparent" color="brand" size="sm">
            <IconSearch stroke={2.5} />
          </ActionIcon>
        </Group>
      )}

      <Stack gap={4}>
        {!isLoading && books && books?.length > 0
          ? books.map((book) => (
              <Fragment key={book.id}>
                <BookItem key={book.id} book={book} />
                {<Divider />}
              </Fragment>
            ))
          : null}

        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height={70} radius="md" />
            ))
          : null}

        {!isLoading && books && !(books?.length > 0) ? (
          <Stack justify="center" mt={40}>
            <Stack align="center" justify="center" gap={0}>
              <ThemeIcon variant="transparent" size={70}>
                <IconMoodPuzzled size={70} />
              </ThemeIcon>
              <Title c={"dimmed"} ta={"center"} fw={500} order={6} mt={10}>
                No Books Found!
              </Title>
            </Stack>
            <Button component={Link} to={MENU_LINKS.ADD_BOOK}>
              Create Book
            </Button>
          </Stack>
        ) : null}
      </Stack>
      <ActionIcon
        radius={"xl"}
        size={"input-xl"}
        pos={"fixed"}
        bottom={120}
        right={30}
        to={MENU_LINKS.ADD_BOOK}
        component={Link}
      >
        <IconPlus />
      </ActionIcon>
    </Stack>
  );
};

export default Book;

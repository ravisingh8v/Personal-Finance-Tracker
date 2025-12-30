import { ActionIcon, Card, Group, Menu, Text, ThemeIcon } from "@mantine/core";
import {
  IconBook2,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import UiConfirmationModal from "../../../shared/components/UiConfirmationModal";
import { MENU_LINKS } from "../../../shared/utility/constants/constants";
import {
  formatAmount,
  formatUtcToRelativeTime,
} from "../../../shared/utility/helper/helper";
import type { IBook } from "../../../shared/utility/model/model";
import { useDeleteBookMutation } from "../../../shared/utility/service/book.service";

const BookItem = ({ book }: { book: IBook }) => {
  const navigate = useNavigate();
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  async function handleDelete() {
    try {
      await deleteBook(book.id).unwrap();
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  }

  return (
    <>
      <Card
        px={0}
        py={"xs"}
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate(`${MENU_LINKS.BOOK}/${book.id}/${MENU_LINKS.EXPENSES}`)
        }
      >
        <Group gap={0} justify="space-between">
          {/* Left Section  */}
          <Group gap={12} style={{ flex: 1 }}>
            <ThemeIcon color="brand" size={"md"} variant="light">
              <IconBook2 size={18} />
            </ThemeIcon>
            <Group
              style={{ flexDirection: "column", flex: 1 }}
              align="start"
              gap={0}
            >
              <Text
                fw={500}
                fz={16}
                lineClamp={2}
                style={{ wordBreak: "break-word" }}
              >
                {book.title}
              </Text>
              <Text fz={12} c={"dimmed"} fw={500}>
                {book.updatedAt ? "Updated" : "Created"}:{" "}
                {formatUtcToRelativeTime(
                  book.updatedAt ? book.updatedAt : book.createdAt
                )}
              </Text>
            </Group>
          </Group>

          {/* Right Section  */}
          <Group
            justify="end"
            gap={0}
            w={book.totalAmount.toString().length > 7 ? "50%" : "40%"}
          >
            <Text
              style={{ flex: 1, textAlign: "end" }}
              truncate
              fz={"md"}
              c={book.totalAmount < 0 ? "red" : "green"}
              fw={500}
            >
              {formatAmount(book.totalAmount, 0, 2)}
            </Text>
            <Menu shadow="sm">
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  color="brand"
                  size="md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconDotsVertical stroke={2.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
                <Menu.Item
                  onClick={() => navigate(MENU_LINKS.EDIT_BOOK + `/${book.id}`)}
                >
                  <Group gap={8}>
                    <ThemeIcon variant="transparent" size={"sm"}>
                      <IconPencil size={18} />
                    </ThemeIcon>
                    <Text fz={"md"}>Edit</Text>
                  </Group>
                </Menu.Item>
                <Menu.Item color="red" onClick={() => setIsConfirmation(true)}>
                  <Group gap={8}>
                    <ThemeIcon variant="transparent" color="red" size={"sm"}>
                      <IconTrash size={18} />
                    </ThemeIcon>
                    <Text fz={"md"}>Delete</Text>
                  </Group>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Card>
      {isConfirmation && (
        <UiConfirmationModal
          title={
            <Text fw={500} fz={"md"}>
              Delete Confirmation
            </Text>
          }
          description={
            <Text fz={"sm"} component="span">
              Are you sure you want to delete book:{" "}
              <Text component="span" fz={"sm"} fw={500}>
                {book.title}
              </Text>
            </Text>
          }
          onClose={() => setIsConfirmation(false)}
          onSubmit={() => handleDelete()}
          isLoading={isLoading}
          opened={isConfirmation}
        ></UiConfirmationModal>
      )}
    </>
  );
};

export default BookItem;

import { ActionIcon, Card, Group, Menu, Text, ThemeIcon } from "@mantine/core";
import {
  IconDotsVertical,
  IconMapPin,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { getAddressString } from "../utility/helper/helper";
import { type IAddress } from "../utility/model/model";

interface IUiAddressesProps {
  onChange?: () => void;
  address: IAddress;
  withActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const UiAddresses = ({
  onChange,
  address,
  withActions,
  onEdit,
  onDelete,
}: IUiAddressesProps) => {
  return (
    <Card bg={"gray.1"} onClick={() => onChange?.()}>
      <Group wrap="nowrap" justify="space-between">
        <Group wrap="nowrap" align="start">
          <ThemeIcon variant="transparent">
            <IconMapPin size={20} />
          </ThemeIcon>
          <Text>{getAddressString(address)}</Text>
        </Group>
        {withActions && (
          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon
                onClick={(e) => e.stopPropagation()}
                variant="transparent"
                c={"dark.5"}
              >
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={onEdit}>
                <Group>
                  <IconPencil size={18} color="var(--mantine-color-black)" />
                  <Text>Edit</Text>
                </Group>
              </Menu.Item>
              <Menu.Item onClick={onDelete}>
                <Group>
                  <IconTrash color="var(--mantine-color-red-text)" size={18} />
                  <Text c={"red"}>Delete</Text>
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Card>
  );
};

export default UiAddresses;

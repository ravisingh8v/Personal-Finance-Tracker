import { type FloatingPosition, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { type IStatus } from "../utility/model/model";
import UiBadgeStatus from "./UiBadgeStatus";

interface UiBadgeWithDropdownProps {
  currentStatus: IStatus;
  statusOptions?: IStatus[];
  onChange?: (newStatus: IStatus) => void;
  dropdownPos?: FloatingPosition;
}

const UiBadgeWithDropdown: React.FC<UiBadgeWithDropdownProps> = ({
  currentStatus,
  statusOptions = [],
  onChange = () => {},
  dropdownPos,
}) => {
  return (
    <Menu
      withinPortal
      shadow="sm"
      position={dropdownPos ?? "bottom-end"}
      disabled={!statusOptions.length}
    >
      <Menu.Target>
        <UnstyledButton>
          <UiBadgeStatus
            statusId={currentStatus?.id}
            status={currentStatus?.status}
            size="md"
            rightSection={<IconChevronDown size={18} />}
          />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {statusOptions.map((status) => (
          <Menu.Item
            key={status.id}
            onClick={() => onChange(status)}
            disabled={status.id === currentStatus.id}
          >
            {status.status}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default UiBadgeWithDropdown;

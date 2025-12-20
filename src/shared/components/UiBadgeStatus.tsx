import { Badge, BadgeProps, BadgeStylesNames, BadgeVariant, MantineSize } from '@mantine/core';
import { OrderStatus } from '../utility/enum/enums';
import { ComponentProps } from 'react';

interface IUiBadgeStatusProps {
  statusId: number;
  status: string;
  size?: MantineSize;
  rightSection?: React.ReactNode;
  variant?: BadgeVariant;
  props?: BadgeProps;
}

const UiBadgeStatus = ({
  statusId,
  status,
  size,
  rightSection,
  variant = 'light',
  props = {},
}: IUiBadgeStatusProps) => {
  if (statusId === OrderStatus.CANCELLED || statusId === OrderStatus.REJECTED || statusId === OrderStatus.FAILED) {
    return (
      <Badge autoContrast color="red" variant={variant} size={size} rightSection={rightSection} {...props}>
        {status}
      </Badge>
    );
  } else if (
    statusId === OrderStatus.PREPARING ||
    statusId === OrderStatus.READY_FOR_PICKUP ||
    statusId === OrderStatus.OUT_FOR_DELIVERY
  ) {
    return (
      <Badge autoContrast color="yellow" variant={variant} size={size} rightSection={rightSection}>
        {status}
      </Badge>
    );
  } else if (statusId === OrderStatus.DELIVERED) {
    return (
      <Badge autoContrast color="green" variant={variant} size={size} rightSection={rightSection}>
        {status}
      </Badge>
    );
  } else {
    return (
      <Badge autoContrast color="blue" variant={variant} size={size} rightSection={rightSection}>
        {status}
      </Badge>
    );
  }
};

export default UiBadgeStatus;

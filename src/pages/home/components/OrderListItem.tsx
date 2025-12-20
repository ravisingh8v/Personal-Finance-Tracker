import { ActionIcon, Divider, Group, Image, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import UiBadgeStatus from '../../../shared/components/UiBadgeStatus';
import {
  IconClockHour5,
  IconListCheck,
  IconLocation,
  IconMapPin,
  IconProgress,
  IconTimeline,
  IconUser,
} from '@tabler/icons-react';
import { Order } from '../utility/models/models';
import { getFormatedDate, getStatusColor } from '../../../shared/utility/helper/helper';
import { replace, useNavigate } from 'react-router';
import { MENU_LINKS } from '../../../shared/utility/constants/constants';

const OrderListItem = ({ orderDetails, redirectBase }: { orderDetails: Order; redirectBase?: string }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Stack
      gap={4}
      p={'sm'}
      bg={'gray.1'}
      style={{ borderRadius: 'var(--mantine-radius-md)', borderLeft: '2px solid var(--mantine-color-brand-7)' }}
      onClick={() => navigate(redirectBase ? redirectBase : `${MENU_LINKS.ORDER}/${orderDetails.id}`)}
    >
      {/* Order Id and Price  */}
      <Group justify="space-between" w={'100%'}>
        <Text lineClamp={1} c="brand" style={{ wordBreak: 'break-all' }}>
          #{orderDetails.id}
        </Text>
        <Group wrap="nowrap" gap={4}>
          {/* <ActionIcon size={18} c={'green'} variant="transparent">
            <IconProgress />
          </ActionIcon> */}
          <UiBadgeStatus status={orderDetails?.status?.status} statusId={orderDetails?.status?.id} />
          {/* <Text size="sm" lineClamp={1} c={getStatusColor(orderDetails?.status?.id)} style={{ wordBreak: 'break-all' }}>
            {orderDetails?.status?.status}
          </Text> */}
        </Group>
      </Group>

      {/* Ordered Items  */}
      <Group gap={'4px'} wrap="nowrap" mt={'-4px'}>
        <ActionIcon size={20} c={'gray'} variant="transparent">
          <IconListCheck />
        </ActionIcon>
        <Text fz="lg" fw={'500'} component="span" lineClamp={1} style={{ wordBreak: 'break-all' }}>
          {orderDetails.items[0].quantity}x {orderDetails.items[0].title}
        </Text>
        {orderDetails?.items?.length > 1 && (
          <Text c={'brand'} fz="md" td={'underline'} component="span">
            +{orderDetails?.items.length - 1}
          </Text>
        )}
      </Group>

      {/* User Details  */}
      <Group wrap="nowrap" gap={4}>
        <ActionIcon size={18} c={'blue'} variant="transparent">
          <IconUser />
        </ActionIcon>
        <Text fz={'sm'} lineClamp={1} style={{ wordBreak: 'break-all' }}>
          {orderDetails.userDetails.name}
        </Text>
      </Group>

      {/* Address 
      <Group wrap="nowrap" gap={4}>
        <ActionIcon size={18} c={'green'} variant="transparent">
          <IconProgress />
        </ActionIcon>
        <Text size="sm" lineClamp={1} c={getStatusColor(orderDetails?.status?.id)} style={{ wordBreak: 'break-all' }}>
          {orderDetails?.status?.status}
        </Text>
      </Group> */}

      {/* Booking Time  */}
      <Group justify="space-between">
        <Group gap={'4px'}>
          <ActionIcon size={18} c={'yellow'} variant="transparent">
            <IconClockHour5 />
          </ActionIcon>
          <Text size="sm" lineClamp={1} style={{ wordBreak: 'break-all' }}>
            {getFormatedDate(orderDetails.orderDate)}
          </Text>
        </Group>

        {/* Order Id and Price  */}
        <Text fz={'xl'} fw={500}>
          ₹{orderDetails.total}
        </Text>
      </Group>
    </Stack>
  );
};
// {/* <Divider />
// <Group p={"sm"} justify="end">

//   <Group gap={"4px"}>
//     <Text fz="xs" c={"dimmed"}>
//       Order Date :
//     </Text>
//     <Text c={"dark"} fz="xs">
//       {/* {format(new Date(orderDate), "dd-MMM-yyyy")} */}
//       20 May 2025 | 20:00
//     </Text>
//   </Group>
// </Group> */}

export default OrderListItem;

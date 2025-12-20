import { Divider, Group, Image, Skeleton, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import OrderListItem from './OrderListItem';
import { useGetOrderListQuery } from '../utility/services/service';
import { useAppSelector } from '../../../store/store';
import { NoDataFoundMessage, orderTabs } from '../utility/constants/constants';
import { ActiveTab, OrderTab } from '../utility/enum/enum';
import { Order } from '../utility/models/models';
import UiDataNotFound from '../../../shared/components/UiDataNotFound';

const OrderList = () => {
  const { activeTab } = useAppSelector((state) => state.homeSlice);
  const { data: { data: { orders: orderList } = {} } = {}, isFetching } = useGetOrderListQuery(
    orderTabs[activeTab as ActiveTab],
    { refetchOnMountOrArgChange: true }
  );
  return (
    <Stack flex={1} style={{ overflow: 'auto' }}>
      {isFetching && new Array(5).fill(0).map((_, index) => <Skeleton key={index} h={120} radius={'md'} />)}
      {!isFetching &&
        !!orderList?.length &&
        orderList?.map((orderItem: Order) => <OrderListItem key={orderItem.id} orderDetails={orderItem} />)}
      {!isFetching && !orderList?.length && (
        <UiDataNotFound
          title="No Data Found"
          description={
            activeTab === ActiveTab.NEW_ORDER ? NoDataFoundMessage.NEW_ORDER : NoDataFoundMessage.IN_PROGRESS
          }
        />
      )}
    </Stack>
  );
};

export default OrderList;

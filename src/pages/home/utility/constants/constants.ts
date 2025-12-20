import { OrderTab } from '../enum/enum';

export const orderTabs = {
  [OrderTab.NEW]: 'new',
  [OrderTab.IN_PROGRESS]: 'in-progress',
  [OrderTab.COMPLETED]: 'completed',
  [OrderTab.CANCELLED]: 'cancelled',
};

export const NoDataFoundMessage = {
  NEW_ORDER: 'You have no new orders at the moment.',
  IN_PROGRESS: 'Currently, there are no orders being prepared. Once accepted, orders will show up here.',
};

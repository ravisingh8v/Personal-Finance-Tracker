import {
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import OrderTabs from "./components/OrderTabs";
import OrderList from "./components/OrderList";

const Home = () => {
  const theme = useMantineTheme();
  return (
    <Stack h={'100%'}>
      <OrderTabs />
      <OrderList />
    </Stack>
  );
};

export default Home;

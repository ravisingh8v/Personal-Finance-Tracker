import { Indicator, Tabs } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/store";
import { ActiveTab } from "../utility/enum/enum";
import { setActiveTab } from "../utility/slice/home.slice";
import classes from "./../Home.module.css";
const OrderTabs = () => {
  const dispatch = useDispatch();
  const { activeTab } = useAppSelector((state) => state.homeSlice);
  return (
    <Tabs
      defaultValue={activeTab}
      styles={{ tab: { fontSize: "16px" } }}
      onChange={(value) => dispatch(setActiveTab(value ?? activeTab))}
    >
      <Tabs.List justify="space-between">
        <Tabs.Tab value={ActiveTab.NEW_ORDER} className={classes.tabs}>
          New Orders
        </Tabs.Tab>
        <Tabs.Tab value={ActiveTab.IN_PROGRESS} className={classes.tabs}>
          In-Progress
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default OrderTabs;

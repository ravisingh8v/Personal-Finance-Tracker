import { Box, Stack, useMantineTheme } from "@mantine/core";
import { useOutlet } from "react-router";
import UiHeader from "../../shared/components/UiHeader";
import { useAppSelector } from "../../store/store";
import BottomBar from "./BottomBar";
import Header from "./Header";

const animations = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};
const Master = () => {
  const { bgColor } = useAppSelector((state) => state.appSlice);
  const theme = useMantineTheme();
  const outlet = useOutlet();
  return (
    <Stack h={"100%"} px="md" style={{ overflow: "hidden" }} bg={bgColor}>
      <Header />
      {/* Sub Header with back button  */}
      <UiHeader />

      <Box style={{ flexGrow: 1, overflow: "auto" }}>{outlet}</Box>
      <BottomBar />
    </Stack>
  );
};

export default Master;

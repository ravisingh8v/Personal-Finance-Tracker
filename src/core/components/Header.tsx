import { useAuth, useClerk } from "@clerk/clerk-react";
import {
  ActionIcon,
  Avatar,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { IconLogout, IconWallet } from "@tabler/icons-react";
import { useState } from "react";
import { getGretting } from "../../shared/utility/helper/helper";
import { useAppSelector } from "../../store/store";
// 6import { getGretting } from "../../shared/utility/helper/helper";

const Header = () => {
  const { signOut } = useClerk();
  const { sessionClaims } = useAuth();
  const { showHeader } = useAppSelector((state) => state.appSlice);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true); // Start loader
    try {
      // You can specify a redirect URL for after the process completes
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      // Note: In most cases, the app will unmount or redirect before this sets to false
      setIsLoggingOut(false);
    }
  };

  return (
    showHeader && (
      <>
        <LoadingOverlay visible={isLoggingOut} />
        <Group
          justify="space-between"
          style={{ borderBottom: "1px solid #EDEDED" }}
          pb="md"
          pt={"md"}
          mx={"-md"}
        >
          <Group gap={"8px"} mx={"md"}>
            <Avatar
              // src={`https://placehold.co/600x400/${theme.colors.brand[5].replace(
              //   "#",
              //   ""
              // )}/white.png?text=${getInitials(
              //   (sessionClaims?.full_name as string) ?? ""
              // )}&font=Open Sans`}
              color={"brand"}
              h={45}
              w={45}
              radius="md"
            >
              <IconWallet />
            </Avatar>
            <Stack gap={0}>
              {/* TODO API Integration  */}
              <Text component="span" fz={"sm"} fw={"bold"} c={"brand"}>
                {getGretting()}
              </Text>
              <Text fw={"bold"} component="span" fz={"sm"} tt={"capitalize"}>
                {(sessionClaims?.full_name as string) ?? ""}
              </Text>
            </Stack>
          </Group>
          <ActionIcon
            variant="transparent"
            size={30}
            color={"red"}
            me={"md"}
            onClick={() => handleSignOut()}
          >
            <IconLogout />
          </ActionIcon>
        </Group>
      </>
    )
  );
};

export default Header;

/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Group, UnstyledButton } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { bottomBarItems } from "../utility/constants/constants";

const BottomBar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // ✅ Fix: Define ref array type
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setButtonRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      buttonRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const index = bottomBarItems.findIndex((item) =>
      item.path !== "/" ? location.pathname.startsWith(item.path) : false
    );
    setActiveIndex(index === -1 ? 0 : index);
  }, [location.pathname]);

  useEffect(() => {
    const activeEl = buttonRefs.current[activeIndex];
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <Box
      pos="sticky"
      bottom={0}
      bg="white"
      style={{ boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)" }}
      // mb={"-md"}
      mx={"-md"}
      px="lg"
      py="lg"
    >
      <Box pos="relative" /* ✅ Remove py="sm" here */>
        <Group justify="space-around" wrap="nowrap" pos="relative">
          {/* Indicator */}
          <Box
            bg="brand"
            opacity={0.1}
            pos="absolute"
            top={0}
            bottom={0}
            left={indicatorStyle.left}
            w={indicatorStyle.width}
            style={{
              borderRadius: "var(--mantine-radius-md)",
              zIndex: 3,
              transition: "all 0.3s ease-in-out",
            }}
          />

          {/* Buttons */}
          {bottomBarItems.map((item, index) => (
            <UnstyledButton
              key={item.id}
              component={Link}
              to={item.path}
              style={{
                width: "100%",
                zIndex: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
              }}
            >
              <Box
                ref={(el) => setButtonRef(el, index)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <item.icon color="#5953c4" />
              </Box>
            </UnstyledButton>
          ))}
        </Group>
      </Box>
    </Box>
  );
};

export default BottomBar;

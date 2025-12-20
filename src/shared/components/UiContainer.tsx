import { Box, Container } from "@mantine/core";
import React from "react";

interface IUiContainerProps {
  children: React.ReactNode;
}

const UiContainer = ({ children }: IUiContainerProps) => {
  return (
    <Box
      h="100%"
      style={{
        overflowY: "auto",
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Container size="420px" h="100%" p={0}>
        {children}
      </Container>
    </Box>
  );
};

export default UiContainer;

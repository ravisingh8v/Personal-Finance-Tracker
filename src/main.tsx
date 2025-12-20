import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { resolver, theme } from "./core/utility/constants/constants.ts";
import { getSystemTheme } from "./core/utility/helper/getSystemTheme.ts";
import "./index.css";
import { router } from "./routing/app.routing.tsx";
import UiContainer from "./shared/components/UiContainer.tsx";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme={getSystemTheme()}
      forceColorScheme="light"
    >
      <Provider store={store}>
        {/* To consider only mobile layout */}
        <UiContainer>
          <Notifications position="top-right" zIndex={1000} limit={1} />
          <RouterProvider router={router} />
        </UiContainer>
      </Provider>
    </MantineProvider>
  </StrictMode>
);

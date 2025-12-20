import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import type { ISummary } from "../../../shared/utility/model/model";

const ExpenseSummary = ({ summary }: { summary: ISummary }) => {
  return (
    <Card withBorder bg={"white"} radius={"md"}>
      <Card.Section px={"md"} py={"sm"} withBorder>
        <Group justify="space-between" color="brand">
          <Text c={"brand"} fw={500}>
            Total Expenses:
          </Text>
          <Text c="brand" fw={500}>
            {summary?.netBalance > 0 ? "+" : ""}
            {summary?.netBalance ?? 0}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section px={"md"} py={"sm"}>
        <Stack gap={8}>
          <Group justify="space-between">
            <Group gap={8}>
              <ThemeIcon variant="transparent" size={"xs"} color="green">
                <IconTrendingUp />
              </ThemeIcon>
              <Text c="dark" fw={500}>
                Income:
              </Text>
            </Group>
            <Text
              c={"green"}
              ta={"right"}
              fw={500}
              style={{ flexGrow: 1 }}
              truncate
            >
              +{summary?.totalIncome ?? 0}
            </Text>
          </Group>
          <Group justify="space-between">
            <Group gap={8}>
              <ThemeIcon variant="transparent" size={"xs"} color="red">
                <IconTrendingDown />
              </ThemeIcon>
              <Text c="dark" fw={500}>
                Expenses:
              </Text>
            </Group>
            <Text
              c={"red"}
              ta={"right"}
              fw={500}
              style={{ flexGrow: 1 }}
              truncate
            >
              -{summary?.totalExpense ?? 0}
            </Text>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default ExpenseSummary;

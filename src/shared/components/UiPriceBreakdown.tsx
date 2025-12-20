import { Divider, Group, Stack, Text } from '@mantine/core';

interface IPriceBreakdownProps {
  priceBreakdownList: { title: string; value: number; fz: string; color: string; fw: string }[];
}

const UiPriceBreakdown = ({ priceBreakdownList }: IPriceBreakdownProps) => {
  return (
    <Stack gap={'4px'}>
      {priceBreakdownList?.map((breakdownItem, index) => {
        const isLastIndex = priceBreakdownList.length - 1 !== index;
        return (
          <>
            {!isLastIndex && <Divider mx={'-md'} />}
            <Group justify="space-between" gap={'4px'}>
              <Text fz={breakdownItem.fz} fw={breakdownItem.fw} c={breakdownItem.color}>
                {breakdownItem.title}:{' '}
              </Text>
              <Text fz={breakdownItem.fz} fw={breakdownItem.fw} c={breakdownItem.color}>
                ₹{breakdownItem.value}
              </Text>
            </Group>
          </>
        );
      })}
    </Stack>
  );
};

export default UiPriceBreakdown;

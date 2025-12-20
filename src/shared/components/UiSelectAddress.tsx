import {
  Box,
  Button,
  Drawer,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getAddressString } from "../utility/helper/helper";
import {
  useAddAddressMutation,
  useGetUserAddressesQuery,
} from "../utility/service/shared.service";
import UiAddresses from "./UiAddresses";
import UiDataNotFound from "./UiDataNotFound";

interface ISelectAddressProp {
  opened: boolean;
  onClose: () => void;
  isLoading?: boolean;
  onChange: ({
    id,
    addressString,
  }: {
    id: number;
    addressString: string;
  }) => void;
}
const UiSelectAddress = ({
  opened,
  onClose,
  isLoading,
  onChange,
}: ISelectAddressProp) => {
  const theme = useMantineTheme();
  const {
    data: { data: { addresses } = {} } = {},
    isLoading: isAddressLoading,
  } = useGetUserAddressesQuery(undefined, { skip: !opened });

  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const addressForm = useForm({
    initialValues: {
      addressLine1: "",
      addressLine2: "",
      city: "Umargam",
      state: "Gujarat",
      pincode: null,
    },
  });

  async function onSaveAddress() {
    const res = await addAddress(addressForm.values).unwrap();
    if (res.success) {
      setIsFormOpen(false);
      addressForm.reset();
    }
  }

  useEffect(() => {
    return () => {
      addressForm.reset();
    };
  }, []);

  return (
    <>
      <LoadingOverlay
        visible={isLoading || isAddressLoading || isAddingAddress}
      />
      <Drawer
        opened={opened}
        onClose={() => {
          setIsFormOpen(false);
          onClose();
        }}
        position="bottom"
        withCloseButton={false}
        styles={{
          content: {
            borderTopLeftRadius: theme.radius.lg,
            borderTopRightRadius: theme.radius.lg,
            display: "flex",
            flexDirection: "column",
          },
          body: {
            flex: 1,
          },
          title: {
            width: "100%",
          },
        }}
        title={
          <Group align="center" justify="space-between">
            <Title order={4}>
              {!isFormOpen ? "Select Address" : "Add Address"}
            </Title>
            {!isFormOpen && (
              <Button
                size="compact-md"
                h={"auto"}
                variant="outline"
                p={"4px"}
                leftSection={<IconPlus size={15} />}
                styles={{
                  section: {
                    marginInlineEnd: "5px",
                  },
                }}
                mr={6}
                onClick={() => setIsFormOpen(true)}
              >
                Add Address
              </Button>
            )}
          </Group>
        }
      >
        {/* Select Address List */}
        {!isFormOpen ? (
          <>
            {!isAddressLoading && addresses && addresses?.length > 0 && (
              <>
                <Text size="md" fw={500}>
                  Choose from the below addresses
                </Text>
                <Stack mt={"xs"}>
                  {addresses &&
                    addresses?.map((address) => (
                      <UiAddresses
                        address={address}
                        onChange={() =>
                          onChange({
                            id: address.id,
                            addressString: getAddressString(address),
                          })
                        }
                      />
                    ))}
                </Stack>
              </>
            )}

            {!isAddressLoading && addresses && !(addresses.length > 0) && (
              <UiDataNotFound
                title="No Data Found"
                description={`Seems like you have not added any address yet. Add the address by clicking "+ Add Address" Button.`}
              />
            )}
          </>
        ) : (
          // <form>
          <Stack h="100%" style={{ display: "flex", flexDirection: "column" }}>
            {/* Scrollable Form Content */}
            <Box style={{ flex: 1, overflowY: "auto" }}>
              <Stack>
                <Textarea
                  // label="Address Line 1"
                  maxRows={2}
                  placeholder="Address Line 1"
                  {...addressForm.getInputProps("addressLine1")}
                />
                <Textarea
                  // label="Address Line 2"
                  maxRows={2}
                  placeholder="Address Line 2"
                  {...addressForm.getInputProps("addressLine2")}
                />
                <Select
                  placeholder="Select City"
                  data={[{ label: "Umargam", value: "1" }]}
                  value="1"
                  disabled
                />
                <Select
                  placeholder="Select State"
                  data={[{ label: "Gujarat", value: "1" }]}
                  value="1"
                  disabled
                />
                <NumberInput
                  placeholder="Pincode"
                  hideControls
                  maxLength={6}
                  {...addressForm.getInputProps("pincode")}
                />
              </Stack>
            </Box>

            {/* Button Row (always visible) */}
            <Group justify="end" mt="md">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" type="submit" onClick={onSaveAddress}>
                Save
              </Button>
            </Group>
          </Stack>
          // </form>
        )}
      </Drawer>
    </>
  );
};

export default UiSelectAddress;

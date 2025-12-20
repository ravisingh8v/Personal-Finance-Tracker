import {
  Button,
  Group,
  Modal,
  Overlay,
  Text,
  type MantineSize,
} from "@mantine/core";
import type React from "react";

interface IUiConfirmationModal {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: React.ReactNode;
  description: React.ReactNode;
  cancelBtnText?: string;
  saveBtnText?: string;
  btnSize?: MantineSize;
  isLoading?: boolean;
}

const UiConfirmationModal = ({
  opened,
  description,
  onClose,
  onSubmit,
  title,
  btnSize,
  cancelBtnText,
  saveBtnText,
  isLoading,
}: IUiConfirmationModal) => {
  return (
    <>
      {isLoading && (
        <Overlay
          zIndex={1000}
          bg={"transparent"}
          opacity={0}
          style={{ pointerEvents: "all" }}
        />
      )}
      <Modal
        title={title ?? "Confirmation"}
        opened={opened}
        onClose={onClose}
        centered
        transitionProps={{ transition: "scale", duration: 200 }}
      >
        <Text>{description}</Text>
        <Group mt={"xl"} justify="end">
          <Button
            size={btnSize ? btnSize : "sm"}
            variant="outline"
            onClick={onClose}
          >
            {cancelBtnText ?? "No"}
          </Button>
          <Button
            size={btnSize ? btnSize : "sm"}
            onClick={onSubmit}
            loading={isLoading ? isLoading : false}
          >
            {saveBtnText ?? "Yes"}
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default UiConfirmationModal;

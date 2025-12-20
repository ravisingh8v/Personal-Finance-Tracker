import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

interface IUiDataNotFoundProps {
  title: string;
  description: string;
}

const UiDataNotFound = ({ title, description }: IUiDataNotFoundProps) => {
  return <Alert icon={<IconInfoCircle />} title={title}>{description}</Alert>;
};

export default UiDataNotFound;

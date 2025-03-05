import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>

      <Button variant="soft" disabled={currentPage === 1}>
        <MdKeyboardDoubleArrowLeft />
      </Button>

      <Button variant="soft" disabled={currentPage === 1}>
        <MdKeyboardArrowLeft />
      </Button>
      <Button variant="soft" disabled={currentPage === pageCount}>
        <MdKeyboardArrowRight />
      </Button>

      <Button variant="soft" disabled={currentPage === pageCount}>
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
}

export default Pagination;

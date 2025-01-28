import { Box, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import { useTodosFilter } from "../context/context";

const TodosPagination: React.FC = () => {
  const { setTodosFilterAttributes } = useTodosFilter();
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setTodosFilterAttributes((prev) => ({ ...prev, page: value - 1 }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
}

export default TodosPagination;
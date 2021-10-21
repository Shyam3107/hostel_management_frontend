import { Box, CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function Loader({ skeleton }) {
  return skeleton ? (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      margin="0px auto"
    >
      <Skeleton variant="text" width="100px" />
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      margin="20px auto"
      paddingBottom="30px"
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

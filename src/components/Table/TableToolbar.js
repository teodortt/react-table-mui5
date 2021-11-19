import React from "react";

import clsx from "clsx";
import DeleteIcon from '@mui/icons-material/Delete';
import GlobalFilter from "./GlobalFilter";
import IconButton from '@mui/material/IconButton'
import { alpha, lighten, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const useToolbarStyles = styled((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: "1 1 100%"
  }
}));

const TableToolbar = (props) => {
  // const classes = useToolbarStyles();
  const {
    numSelected,
    deleteRowsHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    actions = [],
    title = ""
  } = props;
  return (
    <Toolbar
      // className={clsx(classes.root, {
      //   [classes.highlight]: numSelected > 0
      // })}

      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {actions.map((action) => (
        <>{action}</>
      ))}
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          component="div"
          variant="h6"
          id="tableTitle">
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteRowsHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  deleteRowsHandler: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired
};

export default TableToolbar;

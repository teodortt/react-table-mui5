import React from "react";

import Checkbox from "@mui/material/Checkbox";
import MaUTable from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableToolbar from "./TableToolbar";
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import AppBar from "../AppBar";
import AddUserDialog from "../../pages/Users/AddUserDialog";

import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from "react-table";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

function BasicBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          User
        </Link>
        <Typography color="text.primary">List</Typography>
      </Breadcrumbs>
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    // marginLeft: theme.spacing(2.5),
    marginLeft: '25%',
    marginRight: '25%'
  },
  stickyFooter: {
    // bottom: 0,
    width: '100%',
    position: "absolute",
    backgroundColor: "#c1cee3"
  }
}))

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const AwesomeTable = ({ columns, data, deleteRowsHandler, actions, title }) => {
  const classes = useStyles()

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter }
  } = useTable(
    {
      columns,
      data
      //autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  // Render the UI for your table
  return (
    <>
      <CssBaseline />
      {/* <Container maxWidth="lg"> */}

      <AddUserDialog />
      {/* <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 8">
            <Item>xs=8</Item>
            <BasicBreadcrumbs />

          </Box>
          <Box gridColumn="span 4">
            <Item>xs=4</Item>
            <AddUserDialog />

          </Box>
        </Box> */}
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
      {/* </Container> */}
      <TableContainer>
        <TableToolbar
          numSelected={Object.keys(selectedRowIds).length}
          deleteRowsHandler={(event) => {
            deleteRowsHandler(event, selectedRowIds);
          }}
          title={title}
          actions={actions}
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...(column.id === "selection"
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render("Header")}
                    {column.id !== "selection" ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter className={classes.stickyFooter}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: data.length }
                ]}
                colSpan={3}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                labelRowsPerPage={<span>Rows:</span>}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
    </>
  );
};

AwesomeTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
};

export default AwesomeTable;

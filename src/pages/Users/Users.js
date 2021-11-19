import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import AwesomeTable from "../../components/Table/AwesomeTable";
import AddUserDialog from "./AddUserDialog";
import makeData from "./makeData";

const Users = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Visits",
        accessor: "visits"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Profile Progress",
        accessor: "progress"
      }
    ],
    []
  );

  const [data, setData] = React.useState(React.useMemo(() => makeData(20), []));

  const removeByIndexes = (array, indexes) =>
    array.filter((_, i) => !indexes.includes(i));

  const deleteUsersHandler = (event, selectedRowIds) => {
    const newData = removeByIndexes(
      data,
      Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
    );
    setData(newData);
  };

  const addUserHandler = (user) => {
    const newData = data.concat([user]);
    setData(newData);
  };

  return (
    <div>
      <CssBaseline />
      <AwesomeTable
        title=""
        columns={columns}
        data={data}
        deleteRowsHandler={deleteUsersHandler}
      // actions={[<AddUserDialog addUserHandler={addUserHandler} />]}
      />
    </div>
  );
};

export default Users;

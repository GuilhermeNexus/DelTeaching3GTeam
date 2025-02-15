import { useState, useCallback, SetStateAction, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Select from '@mui/material/Select';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import IconButton from '@mui/material/IconButton';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../user-table-row';
import { createBankAccount, getBankAccounts } from '../bank-account-service'

export function UserView() {
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState(false);
  const [IsActive, setIsActive] = useState(true);

  useEffect(() => {
    if(IsActive) 
    {
      getBankAccounts().then(res =>{
        setBankAccounts(res.data);
        setIsActive(false);
      });
    }
  })
  
  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const AccountTypes = [
    {
      "type" : "PAYMENT",
      "typeTranslated" : "Pagamento",
    },
    {
      "type" : "CURRENT",
      "typeTranslated" : "Corrente",
    }
  ];

  const [bankAccountType, setBankAccountType] = useState("PAYMENT");
  const [agency, setAgency] = useState('');
  const [holderEmail, setHolderEmail] = useState('');
  const [holderDocument, setHolderDocument] = useState('');
  const [holderName, setHolderName] = useState('');
  const regex = /[0-9]/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [requestBody, setRequestBody] = useState({
    agency : "",
    type: bankAccountType,
    holder_name: "",
    holder_email: "",
    holder_document: "",
    holder_type: "",
  });

  const handleOpenDialog = () => {
    setOpenCreateAccountModal(true)
  }
  
  const onCloseModal = () => {
    setOpenCreateAccountModal(false)
  }

  const handleCreateAccount = () => {
    requestBody.agency = agency;
    requestBody.holder_name = holderName;
    requestBody.holder_email = holderEmail;
    requestBody.holder_document = holderDocument;
    requestBody.holder_type = requestBody.holder_document.length === 14 ? "LEGAL" : "NATURAL";
    createBankAccount(requestBody);
  }

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Contas Bancárias
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => handleOpenDialog()}
        >
          Criar Conta
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.number)
                  )
                }
                headLabel={[
                  { id: 'number', label: 'Número' },
                  { id: 'document', label: 'Documento' },
                  { id: 'name', label: 'Nome' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.number}
                      row={row}
                      selected={table.selected.includes(row.number)}
                      onSelectRow={() => table.onSelectRow(row.number)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <Dialog open={openCreateAccountModal} onClose={() => onCloseModal()}>
        <DialogTitle id="form-dialog-title">
            Criar Conta bancária
        </DialogTitle>
          <DialogContent >
              <DialogContentText style={{ minWidth: '400px', paddingBottom: '10px', paddingTop: '10px' }}>
                <TextField
                    variant="outlined"
                    className="mb-4"
                    fullWidth
                    name="customerName"
                    value={holderName || ''}
                    onChange={(e) => setHolderName(e.target.value)}
                    label="Nome do cliente"
                    inputProps={{ maxLength: 70 }}
                    autoFocus
                />
                </DialogContentText>
                <DialogContentText style={{ minWidth: '400px', paddingBottom: '10px', paddingTop: '10px' }}>
                <TextField
                    variant="outlined"
                    className="mb-1"
                    fullWidth
                    name="customerDocument"
                    value={holderDocument || ''}
                    onChange={(e) => { 
                      const string = e.target.value.trim();
                      const isValid = regex.test(string);
                      if(isValid) {
                        setHolderDocument(string)
                      }
                    }}
                    label="Documento"
                    inputProps={{ maxLength: 14 }}
                    autoFocus
                />
                </DialogContentText>
                <DialogContentText style={{ minWidth: '400px', paddingBottom: '10px', paddingTop: '10px' }}>
                <TextField
                    variant="outlined"
                    className="mb-1"
                    fullWidth
                    name="agency"
                    type="text"
                    label="Agência"
                    value={agency || ''}
                    onChange={(e) => { 
                      const string = e.target.value.trim();
                      const isValid = regex.test(string);
                      if(isValid) {
                         setAgency(string)
                      }
                    }}
                    inputProps={{ maxLength: 3 }}
                    autoFocus
                />
                </DialogContentText>
                <DialogContentText style={{ minWidth: '400px', paddingBottom: '10px', paddingTop: '10px' }}>
                <TextField
                    variant="outlined"
                    className="mb-1"
                    fullWidth
                    name="holderEmail"
                    value={holderEmail || ''}
                    type="email"
                    onChange={(e) => setHolderEmail(e.target.value.trim())}
                    label="Email"
                    inputProps={{ maxLength: 70 }}
                    autoFocus
                />
                </DialogContentText>
                <DialogContentText style={{ minWidth: '400px', paddingBottom: '10px', paddingTop: '10px' }}>
                  <Select
                    variant="outlined"
                    value={bankAccountType}
                    onChange={(e) => setBankAccountType(e.target.value)}
                  >
                    <MenuItem value="init">
                        <em>Selecione...</em>
                    </MenuItem>
                    {AccountTypes.map((item, index) => (
                        <MenuItem
                            key={index}
                            value={item.type}
                        >
                            {item.typeTranslated}
                        </MenuItem>
                    ))}
                </Select>
                </DialogContentText>

                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => handleCreateAccount()}
                >
                  Criar Conta
                </Button>
          </DialogContent>
      </Dialog>
    </DashboardContent>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

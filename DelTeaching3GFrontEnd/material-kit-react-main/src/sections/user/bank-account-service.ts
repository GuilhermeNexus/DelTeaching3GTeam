import axios from 'axios'

export const createBankAccount = (body: any) => {
    axios.post(`url/api/v1/bank-accounts`, body)
}

export const getBankAccounts = () => axios.get('url/api/v1/bank-accounts');

export const updateBankAccountStatus = (body: any) => {
    axios.put(`url/api/v1/bank-accounts/status`, body)
}

export const getBankAccount = (accountNumber:string) => {
    axios.put(`url/api/v1/bank-accounts/account-number/${accountNumber}`)
}
import {
  _accountNumber,
  _price,
  _document,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
} from './_mock';


export const _users = [...Array(24)].map((_, index) => ({
  number: _accountNumber(index),
  name: _fullName(index),
  document: _document(index),
  status: index % 4 ? 'Ativo' : 'Bloqueado',
}));


const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];


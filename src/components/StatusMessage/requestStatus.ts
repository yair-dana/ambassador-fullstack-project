export type statusType = {
  msg: string;
  status:
    | 'error'
    | 'disabled'
    | 'standard'
    | 'success'
    | 'premium'
    | 'primary'
    | undefined;
};

export const InitStatus: statusType = {
  msg: '',
  status: undefined,
};

export const ErrorStatus = (errorMsg: string) => {
  const newStatus: statusType = {
    msg: `Error: ${errorMsg}`,
    status: 'error',
  };
  return newStatus;
};

export const SuccessStatus = (successMsg: string) => {
  const newStatus: statusType = {
    msg: `${successMsg}`,
    status: 'success',
  };
  return newStatus;
};

export const LoadingStatus: statusType = {
  msg: 'Loading...',
  status: 'primary',
};

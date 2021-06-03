export type statusType = {
  msg: string;
  skin:
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
  skin: undefined,
};

export const ErrorStatus = (errorMsg: string) => {
  const newStatus: statusType = {
    msg: `Error: ${errorMsg}`,
    skin: 'error',
  };
  return newStatus;
};

export const SuccessStatus = (successMsg: string) => {
  const newStatus: statusType = {
    msg: `${successMsg}`,
    skin: 'success',
  };
  return newStatus;
};

export const LoadingStatus: statusType = {
  msg: 'Loading...',
  skin: 'primary',
};

import React from 'react';
import DataHooks from '../../DataHooks';
import { Cell, Text } from 'wix-style-react';
import { statusType } from './requestStatus';

type statusProps = {
  requestStatus: statusType;
};

export default function StatusMessage(props: statusProps) {
  return (
    <Text
      skin={props.requestStatus.status}
      textAlign="center"
      dataHook={DataHooks.STATUS_MESSAGE}
    >
      {props.requestStatus.msg}
    </Text>
  );
}

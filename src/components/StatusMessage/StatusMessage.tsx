import { Cell, Text } from 'wix-style-react';
import DataHooks from '../../DataHooks';
import React from 'react';
import { statusType } from './requestStatus';

type statusProps = {
  requestStatus: statusType;
};

export default function StatusMessage(props: statusProps) {
  return (
    <Text
      skin={props.requestStatus.skin}
      textAlign="center"
      dataHook={DataHooks.STATUS_MESSAGE}
    >
      {props.requestStatus.msg}
    </Text>
  );
}

import React from 'react';
import { Box, Button } from 'wix-style-react';
import DataHooks from '../../DataHooks';

function ActiveBar(props: any) {
  return (
    <Box>
      <Box marginRight="12px">
        <Button
          priority="secondary"
          onClick={props.onAddComment}
          dataHook={DataHooks.ADD_COMMENT}
        >
          Add Comment
        </Button>
      </Box>
      <Box>
        <Button
          dataHook={DataHooks.FETCH_COMMENTS}
          onClick={props.onFetchComments}
        >
          Fetch Comments
        </Button>
      </Box>
    </Box>
  );
}
export default ActiveBar;

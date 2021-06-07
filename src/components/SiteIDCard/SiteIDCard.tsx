import { Card, Cell, FormField, Input } from 'wix-style-react';
import DataHooks from '../../DataHooks';
import React, { ChangeEvent } from 'react';

type siteIDProps = {
  siteID: string;
  onSiteIDChange(event: ChangeEvent<HTMLInputElement>): void;
};

export default function SiteIDCard(props: siteIDProps) {
  return (
    <Card>
      <Card.Content>
        <FormField label="Please Provide Your Site ID" required>
          <Input
            value={props.siteID}
            onChange={props.onSiteIDChange}
            dataHook={DataHooks.SITE_ID}
          />
        </FormField>
      </Card.Content>
    </Card>
  );
}

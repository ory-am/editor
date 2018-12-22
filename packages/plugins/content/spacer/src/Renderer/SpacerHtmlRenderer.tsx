import * as React from 'react';
import { SpacerHtmlRendererProps } from '../types/renderer';
import { defaultSpacerState } from './../default/state';

const SpacerHtmlRenderer: React.SFC<SpacerHtmlRendererProps> = ({
  state: { height } = defaultSpacerState,
}) => {
  return <div style={{ height: `${height.toString()}px` }} />;
};

export default SpacerHtmlRenderer;

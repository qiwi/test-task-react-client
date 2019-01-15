import React from 'react';
import {styled} from '@qiwi/pijma-core';
import LoaderIcon from './LoaderIcon';

const LoaderContainer = styled('div')`
  padding: 40px;
  text-align: center;
  width: 100%;
`;

export class Loader extends React.Component {
    render() {
        return <LoaderContainer><LoaderIcon/></LoaderContainer>
    }
}

import {styled, keyframes} from '@qiwi/pijma-core';
import bigLoaderSvg from './loader-big.svg';

const animateRotate360 = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const LoaderIcon = styled('span')`
    position: relative;
    overflow: hidden;
    display: inline-block;
    text-align: center;
    font-weight: 500;
    color: #666666;
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 20px;    

    &:before {
        background: url("${bigLoaderSvg}") no-repeat center;
        vertical-align: middle;
        animation-name: ${animateRotate360};
        animation-duration: 1500ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
`;

export default LoaderIcon

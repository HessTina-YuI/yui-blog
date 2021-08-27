import NextImage, { ImageProps } from 'next/image';
import React from 'react';

// eslint-disable-next-line jsx-a11y/alt-text
const Image: React.FC<ImageProps> = ({ ...rest }) => <NextImage {...rest} />;

export default Image;

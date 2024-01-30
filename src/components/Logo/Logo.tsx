import React from 'react';

export interface LogoProps {
  name?: string;
}

const Logo = ({ name }: LogoProps) => (
  <img className="mx-2" src={`img/${name}.svg`} alt={`${name}-logo`} height="40" loading="lazy" />
);

export default Logo;
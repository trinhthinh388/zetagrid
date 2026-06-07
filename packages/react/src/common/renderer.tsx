import { RenderResult } from '@core';
import { PropsWithChildren } from 'react';

export const Renderer = ({ render, children }: PropsWithChildren<{ render: RenderResult[] }>) => {
  return (
    <>
      {render.map((item, idx) => (
        <div key={item.attributes['data-slot'] + `#${idx}`} {...item.attributes}>
          {!!item.children.length && <Renderer render={item.children}>{children}</Renderer>}
          {!item.children.length && children}
        </div>
      ))}
    </>
  );
};

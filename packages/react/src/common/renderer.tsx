import { RenderResult } from '@core';
import { ComponentProps, PropsWithChildren } from 'react';

export const Renderer = ({
  render,
  children,
  ...others
}: PropsWithChildren<{ render: RenderResult[] } & ComponentProps<'div'>>) => {
  return (
    <>
      {render.map((item, idx) => (
        <div {...others} key={item.attributes['data-slot'] + `#${idx}`} {...item.attributes}>
          {!!item.children.length && <Renderer render={item.children}>{children}</Renderer>}
          {!item.children.length && children}
        </div>
      ))}
    </>
  );
};

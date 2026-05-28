import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './grid';

const meta = {
  title: 'ZetaGrid',
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default = {} satisfies Story;

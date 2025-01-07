import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Select from './Select';

const meta: Meta<typeof Select> = {
    component: Select,
    title: 'Components/Select/Playground',
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
    args: {},
};

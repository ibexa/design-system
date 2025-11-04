import React from 'react';

import { PartialStoryFn } from 'storybook/internal/types';

export const FormDecorator = (Story: PartialStoryFn) => (
    <form name="default-form">
        <Story />
    </form>
);

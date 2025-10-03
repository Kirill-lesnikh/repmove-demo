import { mergeTests } from '@playwright/test';
import { pages } from './pages';
import { apiClient } from './api';

export const test = mergeTests(pages, apiClient);
export { expect } from '@playwright/test';
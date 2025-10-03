import { test as base } from '@playwright/test';
import { ApiClient } from 'api/apiClient';

type ApiClientFixture = {
  ApiClient: ApiClient;
};

export const apiClient = base.extend<ApiClientFixture>({
    ApiClient: async ({ request }, use) => {
        const apiClient = new ApiClient(request);
        await use(apiClient);
    }
});

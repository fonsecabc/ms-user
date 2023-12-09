export const variables = {
  apiKey: process.env.API_KEY ?? 'undefined',
  jwtSecret: process.env.JWT_SECRET ?? 'undefined',
  notionToken: process.env.NOTION_TOKEN ?? 'undefined',
  notionPageId: process.env.NOTION_PAGE_ID ?? 'undefined',
  databaseUrl: process.env.DATABASE_URL ?? 'undefined',
  databaseAuthToken: process.env.DATABASE_AUTH_TOKEN ?? 'undefined',
  paymentProcessorApiUrl: process.env.PAYMENT_PROCESSOR_API_URL ?? 'undefined',
  paymentProcessorApiKey: process.env.PAYMENT_PROCESSOR_API_KEY ?? 'undefined',
}

export const testVariables = (): boolean => {
  return Object.values(variables).every((value) => {
    return (value !== 'undefined')
  })
}

export { AuthService } from './core/auth/index.js';
export { GraphQLClient } from './core/transport/graphql.js';
export * from './core/errors/index.js';

// Domains
export { AccountsClient } from './domains/accounts/index.js';
export { TransactionsClient } from './domains/transactions/index.js';
export { CategoriesClient } from './domains/categories/index.js';
export { CashflowClient } from './domains/cashflow/index.js';
export { BudgetsClient } from './domains/budgets/index.js';
export { RecurringClient } from './domains/recurring/index.js';
export { PortfolioClient } from './domains/portfolio/index.js';
export { MessagingClient } from './domains/messaging/index.js';

// Formatters & MCP
export * from './formatters/index.js';
export * from './mcp/index.js';

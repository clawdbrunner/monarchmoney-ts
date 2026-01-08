import { AuthService, GraphQLClient, AccountsClient, TransactionsClient } from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const token = process.env.MONARCH_TOKEN;
  const email = process.env.MONARCH_EMAIL;
  const password = process.env.MONARCH_PASSWORD;
  const totpSecret = process.env.MONARCH_TOTP_SECRET;

  const auth = new AuthService();
  if (token) {
    await auth.loginWithToken({ token });
  } else if (email && password) {
    await auth.login({ email, password, totpSecret, saveSession: false });
  } else {
    throw new Error('Provide MONARCH_TOKEN or MONARCH_EMAIL/MONARCH_PASSWORD');
  }

  const gql = new GraphQLClient('https://api.monarchmoney.com', auth);
  const accountsClient = new AccountsClient(gql);
  const txClient = new TransactionsClient(gql);

  const accounts = await accountsClient.list();
  console.log('Accounts:', accounts.accountTypeSummaries.map(s => s.accounts.length).reduce((a, b) => a + b, 0));

  const txns = await txClient.list({ limit: 5, filters: { transactionVisibility: 'non_hidden_transactions_only' } });
  console.log('Transactions fetched:', txns.results.length);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

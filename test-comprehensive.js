#!/usr/bin/env node

require('dotenv').config();
const { MonarchClient } = require('./dist/cjs/index.js');

async function comprehensiveTest() {
  console.log('🧪 Comprehensive functionality test with new credentials...\n');

  const client = new MonarchClient();
  let testResults = {
    auth: false,
    accounts: {
      getAll: false,
      getById: false,
      getNetWorthHistory: false,
      getHistory: false,
      getBalances: false,
      getTypeOptions: false
    },
    transactions: {
      getAll: false,
      search: false
    },
    categories: {
      getAll: false
    },
    budgets: {
      get: false
    }
  };

  try {
    // Test 1: Authentication
    console.log('🔐 Testing Authentication...');
    await client.login({
      email: process.env.MONARCH_EMAIL,
      password: process.env.MONARCH_PASSWORD,
      mfaSecretKey: process.env.MONARCH_MFA_SECRET,
      useSavedSession: false // Force fresh login
    });
    testResults.auth = true;
    console.log('✅ Authentication successful\n');

    // Test 2: Account Methods
    console.log('💰 Testing Account Methods...');

    // Test getAll with different verbosity levels
    console.log('  Testing accounts.getAll()...');
    const allAccounts = await client.accounts.getAll({ verbosity: 'standard' });
    console.log(`    ✅ getAll(standard): ${allAccounts.length} accounts`);

    const lightAccounts = await client.accounts.getAll({ verbosity: 'light' });
    console.log(`    ✅ getAll(light): ${lightAccounts.length} accounts`);

    const ultraLightAccounts = await client.accounts.getAll({ verbosity: 'ultra-light' });
    console.log(`    ✅ getAll(ultra-light): ${ultraLightAccounts.length} accounts`);
    testResults.accounts.getAll = true;

    // Test getById (the one we fixed)
    console.log('  Testing accounts.getById()...');
    const testAccountId = allAccounts[0].id;
    const account = await client.accounts.getById(testAccountId);
    console.log(`    ✅ getById: ${account.displayName} (${account.id})`);
    testResults.accounts.getById = true;

    // Test getNetWorthHistory (the one we fixed)
    console.log('  Testing accounts.getNetWorthHistory()...');
    const netWorth = await client.accounts.getNetWorthHistory();
    console.log(`    ✅ getNetWorthHistory: ${netWorth.length} records`);
    if (netWorth.length > 0) {
      console.log(`    📊 Latest: $${netWorth[netWorth.length-1].netWorth} (${netWorth[netWorth.length-1].date})`);
    }
    testResults.accounts.getNetWorthHistory = true;

    // Test getHistory (the one we fixed)
    console.log('  Testing accounts.getHistory()...');
    const history = await client.accounts.getHistory(testAccountId);
    console.log(`    ✅ getHistory: ${history.length} records`);
    testResults.accounts.getHistory = true;

    // Test getBalances
    console.log('  Testing accounts.getBalances()...');
    const balances = await client.accounts.getBalances();
    console.log(`    ✅ getBalances: ${balances.length} records`);
    testResults.accounts.getBalances = true;

    // Test getTypeOptions
    console.log('  Testing accounts.getTypeOptions()...');
    const typeOptions = await client.accounts.getTypeOptions();
    console.log(`    ✅ getTypeOptions: ${typeOptions.types.length} types, ${typeOptions.subtypes.length} subtypes`);
    testResults.accounts.getTypeOptions = true;

    console.log('');

    // Test 3: Transaction Methods
    console.log('💳 Testing Transaction Methods...');

    console.log('  Testing transactions.getAll()...');
    const transactions = await client.transactions.getAll({
      limit: 10,
      verbosity: 'light'
    });
    console.log(`    ✅ getAll: ${transactions.length} transactions`);
    testResults.transactions.getAll = true;

    console.log('  Testing transactions.search()...');
    const searchResults = await client.transactions.search('groceries', { limit: 5 });
    console.log(`    ✅ search: ${searchResults.length} results for "groceries"`);
    testResults.transactions.search = true;

    console.log('');

    // Test 4: Category Methods
    console.log('🏷️  Testing Category Methods...');

    console.log('  Testing categories.getAll()...');
    const categories = await client.categories.getAll();
    console.log(`    ✅ getAll: ${categories.length} categories`);
    testResults.categories.getAll = true;

    console.log('');

    // Test 5: Budget Methods
    console.log('📊 Testing Budget Methods...');

    console.log('  Testing budgets.get()...');
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];

    const budgets = await client.budgets.get(startDate, endDate);
    console.log(`    ✅ get: ${budgets.categories.length} budget categories`);
    testResults.budgets.get = true;

    console.log('');

  } catch (error) {
    console.error(`❌ Test failed at: ${error.message}`);
    console.error(error);
  }

  // Print comprehensive results
  console.log('📋 Test Results Summary:');
  console.log('========================');
  console.log(`🔐 Authentication: ${testResults.auth ? '✅' : '❌'}`);

  console.log('\n💰 Account Methods:');
  Object.entries(testResults.accounts).forEach(([method, passed]) => {
    console.log(`   ${method}: ${passed ? '✅' : '❌'}`);
  });

  console.log('\n💳 Transaction Methods:');
  Object.entries(testResults.transactions).forEach(([method, passed]) => {
    console.log(`   ${method}: ${passed ? '✅' : '❌'}`);
  });

  console.log('\n🏷️  Category Methods:');
  Object.entries(testResults.categories).forEach(([method, passed]) => {
    console.log(`   ${method}: ${passed ? '✅' : '❌'}`);
  });

  console.log('\n📊 Budget Methods:');
  Object.entries(testResults.budgets).forEach(([method, passed]) => {
    console.log(`   ${method}: ${passed ? '✅' : '❌'}`);
  });

  // Calculate overall success
  const allTests = [
    testResults.auth,
    ...Object.values(testResults.accounts),
    ...Object.values(testResults.transactions),
    ...Object.values(testResults.categories),
    ...Object.values(testResults.budgets)
  ];

  const passedTests = allTests.filter(Boolean).length;
  const totalTests = allTests.length;

  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed (${Math.round(passedTests/totalTests*100)}%)`);

  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! The library is fully functional with new credentials.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above for details.');
  }
}

comprehensiveTest();
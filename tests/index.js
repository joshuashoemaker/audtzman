import ProgressBar from 'progress'

import clientTests from './core/entities/clientTests.js'

function runTestsAndReturnFailures (tests) {
  const testTotalCount = tests.length

  const testBar = new ProgressBar(
    `\x1b[36mRunning Tests [:bar] :current/${testTotalCount}`,
    { total: testTotalCount }
  )

  let testsFailed = []

  for (let i = 0; i < testTotalCount; i++) {
    const passedTest = tests[i].test()
    testBar.tick()

    if (!passedTest) testsFailed.push(tests[i].name)
    
    if (testBar.complete) return testsFailed
  }
}

function init (tests) {
  const failedTestsResults = runTestsAndReturnFailures(tests)
  if (failedTestsResults.length === 0) {
    console.log('\x1b[32m%s\x1b[0m', 'All Tests Passed!!')
  } else {
    console.log(`\x1b[31mFailed ${failedTestsResults.length} tests.\x1b[0m`)
    failedTestsResults.forEach(test => {
      console.log(`\x1b[33m${test}\x1b[0m`)
    })
  }
}

const testsArray = [
  clientTests
]

init (testsArray.flat())

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

// This is a dumb test to test my travisCI setup
it('The tautology test: True should be a true.', () => {
    let trueStatment = true;
    trueStatment.should.equal(true);
});

// This is a dumb test to test my travisCI setup and to demo expect
it('Another tautology test.', () => {
    let salesPitch = true;
    expect(salesPitch).to.be.true;
});
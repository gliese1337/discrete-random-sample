import 'mocha';
import { expect } from 'chai';
import { search, pdf2cdf } from '../src/lib';

describe("Search tests", () => {
  it("", () => {
    search([0],0,0,0);
    expect(true).to.be.true;
  });
});

describe("CDF tests", () => {
  it("", () => {
    pdf2cdf([],[],0);
    expect(true).to.be.true;
  });
});
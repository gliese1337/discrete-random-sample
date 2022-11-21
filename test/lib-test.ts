import 'mocha';
import { expect } from 'chai';
import { search, pdf2cdf, samplePDF } from '../src/lib';

describe("CDF tests", () => {
  it("should calculate CDF for uniform PDF", () => {
    const cdf: number[] = [];
    pdf2cdf([1,1,1,1,1],cdf,5);
    expect(cdf).eqls([1,2,3,4,5]);
  });

  it("should calculate CDF for monotonic PDF", () => {
    const cdf: number[] = [];
    pdf2cdf([1,2,3,4,5],cdf,5);
    expect(cdf).eqls([1,3,6,10,15]);
  });
  
  it("should calculate CDF for triangular PDF", () => {
    const cdf: number[] = [];
    pdf2cdf([1,2,3,4,3,2,1],cdf,7);
    expect(cdf).eqls([1,3,6,10,13,15,16]);
  });
  
  it("should not calculate CDF for invalid PDF", () => {
    const cdf: number[] = [];
    expect(() => pdf2cdf([1,2,3,-4,3,2,1],cdf,7)).to.throw;
  });
});

describe("Search tests", () => {
  it("should search a uniform PDF", () => {
    const cdf: number[] = [];
    pdf2cdf([1,1,1,1,1],cdf,5);
    const searches: [number,number][] = [
      [0.5, 0],
      [1, 0],
      [1.5, 1],
      [2, 1],
      [2.5, 2],
      [3, 2],
      [3.5, 3],
      [4, 3],
      [4.5, 4],
    ];
    for (const [v, i] of searches) {
      expect(search(cdf, 0, 5, v)).eqls(i);
    }
  });

  it("should search a monotonic PDF", () => {
    const cdf: number[] = [];
    pdf2cdf([1,2,3,4,5],cdf,5);
    //expect(cdf).eqls([1,3,6,10,15]);
    const searches: [number,number][] = [
      [0.5, 0],
      [1, 0], [1.5, 1],
      [2, 1], [2.5, 1],
      [3, 1], [3.5, 2],
      [4, 2], [4.5, 2],
      [5, 2], [5.5, 2],
      [6, 2], [6.5, 3],
      [7, 3], [7.5, 3],
      [8, 3], [8.5, 3],
      [9, 3], [9.5, 3],
      [10, 3], [10.5, 4],
      [11, 4], [11.5, 4],
      [12, 4], [12.5, 4],
      [13, 4], [13.5, 4],
      [14, 4], [14.5, 4],
    ];
    for (const [v, i] of searches) {
      expect(search(cdf, 0, 5, v)).eqls(i);
    }
  });
  
  it("should search a triangular PDF", () => {
    const cdf: number[] = [];
    pdf2cdf([1,2,3,4,3,2,1,],cdf,7);
    //expect(cdf).eqls([1,3,6,10,13,15,16]);
    const searches: [number,number][] = [
      [0.5, 0],
      [1, 0], [1.5, 1],
      [2, 1], [2.5, 1],
      [3, 1], [3.5, 2],
      [4, 2], [4.5, 2],
      [5, 2], [5.5, 2],
      [6, 2], [6.5, 3],
      [7, 3], [7.5, 3],
      [8, 3], [8.5, 3],
      [9, 3], [9.5, 3],
      [10, 3], [10.5, 4],
      [11, 4], [11.5, 4],
      [12, 4], [12.5, 4],
      [13, 4], [13.5, 5],
      [15, 5], [14.5, 5],
      [15, 5], [15.5, 6],
    ];
    for (const [v, i] of searches) {
      expect(search(cdf, 0, 7, v)).eqls(i);
    }
  });
});

describe("PDF tests", () => {
  it("should sample from uniform PDF", () => {
    const pdf = [1,1,1,1,1];
    const samples: [number, number][] = [
      [0, 0], [0.5, 0],
      [1, 0], [1.5, 1],
      [2, 1], [2.5, 2],
      [3, 2], [3.5, 3],
      [4, 3], [4.5, 4],
      [5, 4],
    ];
    for (const [v, i] of samples) {
      expect(samplePDF(pdf, 5, v)).eqls(i);
    }
  });

  it("should sample from monotonic PDF", () => {
    const pdf = [1,2,3,4,5];
    //expect(cdf).eqls([1,3,6,10,15]);
    const samples: [number, number][] = [
      [0, 0], [0.5, 0],
      [1, 0], [1.5, 1],
      [2, 1], [2.5, 1],
      [3, 1], [3.5, 2],
      [4, 2], [4.5, 2],
      [5, 2], [5.5, 2],
      [6, 2], [6.5, 3],
      [7, 3], [7.5, 3],
      [8, 3], [8.5, 3],
      [9, 3], [9.5, 3],
      [10, 3], [10.5, 4],
      [11, 4], [11.5, 4],
      [12, 4], [12.5, 4],
      [13, 4], [13.5, 4],
      [14, 4], [14.5, 4],
      [15, 4],
    ];
    for (const [v, i] of samples) {
      expect(samplePDF(pdf, 5, v)).eqls(i);
    }
  });
  
  it("should sample from triangular PDF", () => {
    const pdf = [1,2,3,4,3,2,1];
    //expect(cdf).eqls([1,3,6,10,13,15,16]);
    const samples: [number, number][] = [
      [0, 0], [0.5, 0],
      [1, 0], [1.5, 1],
      [2, 1], [2.5, 1],
      [3, 1], [3.5, 2],
      [4, 2], [4.5, 2],
      [5, 2], [5.5, 2],
      [6, 2], [6.5, 3],
      [7, 3], [7.5, 3],
      [8, 3], [8.5, 3],
      [9, 3], [9.5, 3],
      [10, 3], [10.5, 4],
      [11, 4], [11.5, 4],
      [12, 4], [12.5, 4],
      [13, 4], [13.5, 5],
      [14, 5], [14.5, 5],
      [15, 5], [15.5, 6],
      [16, 6]
    ];
    for (const [v, i] of samples) {
      expect(samplePDF(pdf, 7, v)).eqls(i);
    }
  });
  
  it("should not sample from invalid PDF", () => {
    const pdf = [1,2,3,-4,3,2,1];
    expect(() => samplePDF(pdf, 7, 8)).to.throw;
  });
});

describe("PDF-CDF comparison tests", () => {
  it("should calculate the same values for CDF & PDF sampling for uniform PDF", () => {
    const pdf = [1,1,1,1,1];
    const cdf: number[] = [];
    pdf2cdf(pdf,cdf,5);
    for (let x = 0; x <= 5; x += 0.5) {
      expect(search(cdf, 0, 5, x)).eqls(samplePDF(pdf, 5, x));
    }
  });

  it("should calculate the same values for CDF & PDF sampling for monotonic PDF", () => {
    const pdf = [1,2,3,4,5];
    const cdf: number[] = [];
    pdf2cdf(pdf,cdf,5);
    for (let x = 0; x <= 15; x += 0.5) {
      expect(search(cdf, 0, 5, x)).eqls(samplePDF(pdf, 5, x));
    }
  });
  
  it("should calculate the same values for CDF & PDF sampling for triangular PDF", () => {
    const pdf = [1,3,6,10,13,15,16];
    const cdf: number[] = [];
    pdf2cdf(pdf,cdf,7);
    for (let x = 0; x <= 16; x += 0.5) {
      expect(search(cdf, 0, 7, x)).eqls(samplePDF(pdf, 7, x));
    }
  });
});
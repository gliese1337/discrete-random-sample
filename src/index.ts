import { pdf2cdf, samplePDF, search } from "./lib";

export class DiscreteSample {
  private constructor(private cdf: ArrayLike<number>, public readonly len: number, private max: number) { }

  public static fromPDF(pdf: ArrayLike<number>, buffer: ArrayLike<number> & { [key: number]: number; } = new Float64Array(pdf.length)) {
    const len = Math.min(pdf.length, buffer.length);
    const sum = pdf2cdf(pdf, buffer, len);
    return new DiscreteSample(buffer, len, sum);
  }

  public static fromCDF(cdf: ArrayLike<number>) {
    return new DiscreteSample(cdf, cdf.length, cdf[cdf.length-1]);
  }

  sample() {
    const { cdf, len, max } = this;
    return search(cdf, 0, len, Math.random() * max);
  }

  public static sample(pdf: ArrayLike<number>, max?: number) {
    const len = pdf.length;
    if (typeof max === 'undefined') {
      max = 0;
      for (let i = 0; i < len; i++) { max += pdf[i]; }
    }
    return samplePDF(pdf, len, Math.random() * max);
  }

  public static reject_sample(pdf: ArrayLike<number>, max?: number) {
    const len = pdf.length;
    if (typeof max === 'undefined') {
      max = 0;
      for (let i = 0; i < len; i++) { max = Math.max(max, pdf[i]); }
    }
    for (;;) {
      const bucket = Math.floor(Math.random() * len);
      if (Math.random() * max < pdf[bucket]) { return bucket; }
    }
  }
}
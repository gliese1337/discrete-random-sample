import { pdf2cdf, search } from "./lib";

export class DiscreteSample {
  constructor(private cdf: ArrayLike<number>, public readonly len: number, private max: number) { }

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
}
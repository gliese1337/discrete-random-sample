import { pdf2cdf, samplePDF, search } from "./lib";

export class ApproximateDiscreteSample {
  private constructor(
    private s: ArrayLike<number>,
    private precision: number,
    public readonly len: number,
  ) { }

  sample() {
    return this.s[Math.floor(Math.random() * this.precision)];
  }
}

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

  approximate(precision: number): ApproximateDiscreteSample;
  approximate(samples: ArrayLike<number> & { [key: number]: number; }): ApproximateDiscreteSample;
  approximate(arg: number | (ArrayLike<number> & { [key: number]: number; })) {
    const { cdf, len, max } = this;
    let samples: ArrayLike<number> & { [key: number]: number; };
    let precision: number;
    if (typeof arg === 'number') {
      precision = arg;
      samples = len <= 256 ? new Uint8Array(arg) :
                      len <= 2**16 ? new Uint16Array(arg) :
                      new Uint32Array(arg);
    } else {
      samples = arg;
      precision = arg.length;
    }
    for (let i = 0; i < len; i++) {
      samples[i] = search(cdf, 0, len, Math.random() * max);
    }
    return new (ApproximateDiscreteSample as any)(samples, precision, len);
  }

  public static sample(pdf: ArrayLike<number>, sum?: number) {
    const len = pdf.length;
    if (typeof sum === 'undefined') {
      sum = 0;
      for (let i = 0; i < len; i++) { sum += pdf[i]; }
    }
    return samplePDF(pdf, len, Math.random() * sum);
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
  
  public static sample_cdf(cdf: ArrayLike<number>) {
    return search(cdf, 0, cdf.length, Math.random() * cdf[cdf.length-1]);
  }
}
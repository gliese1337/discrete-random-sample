# discrete-random-sample
 Generate random values from arbitrary discrete distributions.

This package exports a single class with a private constructor:

```ts
export declare class DiscreteSample {
    readonly len: number;

    // O(n) pre-processing
    static fromPDF(pdf: ArrayLike<number>, buffer?: ArrayLike<number>): DiscreteSample;

    // O(1) pre-processing
    static fromCDF(cdf: ArrayLike<number>): DiscreteSample;

    // O(log n) sample
    sample(): number;

    // O(n) sample
    static sample(pdf: ArrayLike<number>, sum?: number): number;

    // Probabilistic amortized O(1) sample
    static reject_sample(pdf: ArrayLike<number>, max?: number): number;

    // O(log n) sample
    static sample_cdf(cdf: ArrayLike<number>): number;
}
```

All sampling methods will return non-negative integers corresponding to a discretized bucket.

The `fromPDF` and `fromCDF` static methods will return a `DiscreteSample` object on which you can call `sample()` to generate values in the range `[0, len - 1]`, where the readonly `len` property is derived from the length of the input distributions. The `fromPDF` method generates a Comulative Distribution Function (CDF) from an input Probability Distribution Function (PDF); if a scratch buffer for storing the CDF is not provided, a `Float64Array` of the same length as the input PDF will be allocated for it. A valid PDF must not contain any negative values. After linear-time construction of the CDF, calls to `sample()` run in `O(log n)` time, where `n` is the number of discrete buckets in the distribution. If you already have a CDF, the `fromCDF` method allows you to avoid the linear-time preprocessing step. However, because the whole point is to avoid linear-time operations, it does not do any input validation. A valid CDF must be composed of non-negative numbers sorted in ascending order; if you provide an invalid CDF, `sample()` will break in weird ways.

If you only need to get one sample from a PDF, the static `DiscreteSample.sample` method will directly sample the PDF in linear time. This requires knowing the sum of the all values in the discrete PDF for normalization; if you already know that, you can pass it in directly; otherwise, this method will perform two passes to discover that value for itself.

The static `DiscreteSample.reject_sample` method is an alternative probabilistic sampling algorithm which runs in O(1) time on average, but can take arbitrarily long if you get unlucky. It requires knowing the maximum single bucket value in the discrete PDF. As with `DiscreteSample.sample`, if you know that value, you can pass it in; otherwise, this method will perform an `O(n)` linear-time traversal to extract the value itself.

The static `DiscreteSample.sample_cdf` method performs an `O(log n)` sample on a CDF without constructing a `DiscreteSample` object. Like the `fromCDF` factory function, it does not perform any input validation, and will do weird things if you pass in an invalid CDF.
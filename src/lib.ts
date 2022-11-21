export function search(cdf: ArrayLike<number>, l: number, r: number, x: number){
  for (;;) {
    const mid = l + ((r - l) >> 1);
    if (cdf[mid] >= x) {
      if (mid === 0 || cdf[mid-1] < x) {
        return mid;
      }
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
}

export function pdf2cdf(pdf: ArrayLike<number>, buffer: ArrayLike<number> & { [key: number]: number; }, len: number) {
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const v = pdf[i];
    if (v < 0) { throw new Error("Probabilityy Distribution Function cannot contain negative values."); }
    sum += v;
    buffer[i] = sum;
  }
  return sum;
}

export function samplePDF(pdf: ArrayLike<number>, len: number, x: number) {
  for (let i = 0; i < len; i++) {
    const v = pdf[i];
    if (v < 0) { throw new Error("Probability Distribution Function cannot contain negative values."); }
    x -= v;
    if (x <= 0) { return i; }
  }
  return len - 1; // should never happen
}
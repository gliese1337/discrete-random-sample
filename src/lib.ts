export function search(cdf: ArrayLike<number>, l: number, r: number, x: number){
  for (;;) {
    const mid = l + ((r - l) >> 1);
    console.log(l,mid,r,x);
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
    sum += pdf[i];
    buffer[i] = sum;
  }
  return sum;
}
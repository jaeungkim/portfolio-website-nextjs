// https://school.programmers.co.kr/learn/courses/30/lessons/178870
function Oct12thSunday2Solution(sequence, k) {
  const N = sequence.length;
  let left = 0;
  let sum = 0;
  let bestLen = N + 1;
  let ans = [-1, -1];

  for (let right = 0; right < N; right++) {
    sum += sequence[right];

    while (sum > k && left <= right) {
      sum -= sequence[left++];
    }

    if (sum === k) {
      const len = right - left + 1;
      if (len < bestLen || (len === bestLen && left < ans[0])) {
        bestLen = len;
        ans = [left, right];
      }
    }
  }
  return ans;
}

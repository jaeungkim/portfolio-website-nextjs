// https://school.programmers.co.kr/learn/courses/30/lessons/389479?language=javascript

function Oct12thSundaySolution(players, m, k) {
  let answer = 0; // 총 증설 횟수
  let currentServerCount = 0; // 현재 가동 중(증설된) 서버 수
  const T = players.length;
  const expire = new Array(T + k + 1).fill(0); // i+k에 반납 예약

  console.log(expire);

  for (let i = 0; i < T; i++) {
    // 1) 이 시간대 시작에 만료 처리
    if (expire[i] !== 0) currentServerCount -= expire[i];

    // 2) 이 시간대 필요한 서버 수
    const needServerCount = Math.floor(players[i] / m);

    // 3) 부족하면 그만큼 증설
    if (currentServerCount < needServerCount) {
      const add = needServerCount - currentServerCount; // 부족분만
      answer += add; // 증설 횟수 누적
      currentServerCount += add; // 지금 바로 켜짐
      expire[i + k] += add; // k시간 뒤에 반납 예약
    }
    // currentServerCount > need면 그냥 유지 (k 끝나면 알아서 줄어듦)
  }

  return answer;
}

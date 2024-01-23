function isValidUrl(url) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // 프로토콜
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // 도메인명
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // 혹은 IP (v4) 주소
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // 포트번호와 경로
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // 쿼리 문자열
      "(\\#[-a-z\\d_]*)?$", // 해시 태그
    "i"
  );
  return !!pattern.test(url);
}

export default function openLink(link) {
  if (isValidUrl(link)) {
    window.open(link, "_blank");
  }
}

type TMatcherFn = (name: string) => boolean;

const patternMatcherMap: Record<string, TMatcherFn> = {
  // 3d
  '999': s => /^\d{3}$/.test(s),
  'aaa': s => /^(\d)\1{2}$/.test(s),
  'abc': s => /^(012|123|234|345|456|567|678|789)$/.test(s),
  'abb': s => /^(\d)(\d(?<!\1))\2$/.test(s),
  'aba': s => /^(\d)(\d(?<!\1))\1$/.test(s),
  'aab': s => /^(\d)\1(\d(?<!\1))$/.test(s),
  '360-degree': s => /^([0-2][0-9]{2}|3[0-5][0-9]|360)\°$/.test(s),
  '0x999': s => /^0x\d{3}$/.test(s),
  '999jp': s => /^[零壱弐参肆伍陸漆捌玖]{3}$/.test(s),
  '999cn': s => /^[零一二三四五六七八九]{3}$/.test(s),
  'arabic999': s => /^[٠١٢٣٤٥٦٧٨٩]{3}$/.test(s),
  'flag999': s => /^[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]\d{3}$/.test(s),

  // 4d
  '10k': s => /^\d{4}$/.test(s),
  // TODO: rare4d
  'abcd': s => /^(0123|1234|2345|3456|4567|5678|6789)$/.test(s),
  'aaaa': s => /^(\d)\1{3}$/.test(s),
  'abbb': s => /^(\d)(\d(?<!\1))\2{2}$/.test(s),
  'aabb': s => /^(\d)\1(\d(?<!\1))\2$/.test(s),
  'aaab': s => /^(\d)\1{2}(\d(?<!\1))$/.test(s),
  'abaa': s => /^(\d)(\d(?<!\1))\1{2}$/.test(s),
  'aaba': s => /^(\d)\1(\d(?<!\1))\1$/.test(s),
  'abba': s => /^(\d)(\d(?<!\1))\2\1$/.test(s),
  'abab': s => /^(\d)(\d(?<!\1))\1\2$/.test(s),
  'aabc': s => /^(\d)\1(\d(?<!\1))(\d(?<!\1|\2))$/.test(s),
  'abcc': s => /^(\d)(\d(?<!\1))(\d(?<!\1|\2))\3$/.test(s),
  'abbc': s => /^(\d)(\d(?<!\1))\2(\d(?<!\1|\2))$/.test(s),
  '0xxx': s => /^0\d{3}$/.test(s),
  '00xx': s => /^00\d{2}$/.test(s),
  '0x0x': s => /^0\d{1}0\d{1}$/.test(s),
  '0xx0': s => /^0\d{2}0$/.test(s),
  'xx00': s => /^\d{2}00$/.test(s),
  'xx88': s => /^\d{2}88$/.test(s),
  'xx69': s => /^\d{2}69$/.test(s),
  'times-table': s => /^[1-9]{2}\d{2}$/.test(s) && Number(s[0]) <= Number(s[1]) && Number(s[0]) * Number(s[1]) === Number(s.substring(2)),
  'mmdd': s => /^((0[1-9]|1[0-2])(0[1-9]|[12][0-9])|(0[13578]|1[02])(3[01])|(0[469]|11)30)$/.test(s),
  '0x10k': s => /^0x\d{4}$/.test(s),
  'arabic10k': s => /^[٠١٢٣٤٥٦٧٨٩]{4}$/.test(s),

  // 5d
  '100k': s => /^\d{5}$/.test(s),
  'aaaaa': s => /^(\d)\1{4}$/.test(s),
  'abcde': s => /^(01234|12345|23456|34567|45678|56789)$/.test(s),
  'abbbb': s => /^(\d)(\d(?<!\1))\2{3}$/.test(s),
  'aabbb': s => /^(\d)\1(\d(?<!\1))\2{2}$/.test(s),
  'aaabb': s => /^(\d)\1{2}(\d(?<!\1))\2$/.test(s),
  'aaaab': s => /^(\d)\1{3}(\d(?<!\1))$/.test(s),
  'abbba': s => /^(\d)(\d(?<!\1))\2{2}\1$/.test(s),
  'abaaa': s => /^(\d)(\d(?<!\1))\1{3}$/.test(s),
  'aabaa': s => /^(\d)\1(\d(?<!\1))\1{2}$/.test(s),
  'aaaba': s => /^(\d)\1{2}(\d(?<!\1))\1$/.test(s),
  'ababa': s => /^(\d)(\d(?<!\1))\1\2\1$/.test(s),
  'xabcd': s => /^\d{1}(0123|1234|2345|3456|4567|5678|6789)$/.test(s),
  'xx000': s => /^\d{2}000$/.test(s),
  '00xx0': s => /^00\d{2}0$/.test(s),
  '000xx': s => /^000\d{2}$/.test(s),
  'xx420': s => /^\d{2}420$/.test(s),
  'aaabc': s => /^(\d)\1{2}(\d(?<!\1))(\d(?<!\1|\2))$/.test(s),
  'aabbc': s => /^(\d)\1(\d(?<!\1))\2(\d(?<!\1|\2))$/.test(s),
  'aabcc': s => /^(\d)\1(\d(?<!\1))(\d(?<!\1|\2))\3$/.test(s),
  'abccc': s => /^(\d)(\d(?<!\1))(\d(?<!\1|\2))\3{2}$/.test(s),
  'abbcc': s => /^(\d)(\d(?<!\1))\2(\d(?<!\1|\2))\3$/.test(s),
  'abbbc': s => /^(\d)(\d(?<!\1))\2{2}(\d(?<!\1|\2))$/.test(s),
  'abcba': s => /^(\d)(\d(?<!\1))(\d(?<!\1|\2))\2\1$/.test(s),
  'xxx69': s => /^\d{3}69$/.test(s),
  '69xxx': s => /^69\d{3}$/.test(s),
  '00xxx': s => /^00\d{3}$/.test(s),
  'xxx00': s => /^\d{3}00$/.test(s),

  // 6d
  'aaaaaa': s => /^(\d)\1{5}$/.test(s),
  'abbbbb': s => /^(\d)(\d(?<!\1))\2{4}$/.test(s),
  'aabbbb': s => /^(\d)\1(\d(?<!\1))\2{3}$/.test(s),
  'aaabbb': s => /^(\d)\1{2}(\d(?<!\1))\2{2}$/.test(s),
  'aaaabb': s => /^(\d)\1{3}(\d(?<!\1))\2$/.test(s),
  'aaaaab': s => /^(\d)\1{4}(\d(?<!\1))$/.test(s),
  'abbabb': s => /^(\d)(\d(?<!\1))\2\1\2{2}$/.test(s),
  'ababab': s => /^(\d)(\d(?<!\1))\1\2\1\2$/.test(s),
  '00xx00': s => /^00\d{2}00$/.test(s),
  'aabbcc': s => /^(\d)\1(\d(?<!\1))\2(\d(?<!\1|\2))\3$/.test(s),
  'abcccc': s => /^(\d)(\d(?<!\1))(\d(?<!\1|\2))\3{3}$/.test(s),
  'abbbbc': s => /^(\d)(\d(?<!\1))\2{3}(\d(?<!\1|\2))$/.test(s),
  'aaaabc': s => /^(\d)\1{3}(\d(?<!\1))(\d(?<!\1|\2))$/.test(s),
  'abcabc': s => /^(\d)(\d(?<!\1))(\d(?<!\1|\2))\1\2\3$/.test(s),
  'xxx420': s => /^\d{3}420$/.test(s),
  '420xxx': s => /^420\d{3}$/.test(s),
  'xxx000': s => /^\d{3}000$/.test(s),
  '000xxx': s => /^000\d{3}$/.test(s),

  // FIXME: 'a-share-code': s => /^(0|6)0[0-3]{1}\d{3}$/.test(s),
  'xxxx69': s => /^\d{4}69$/.test(s),

  // gt6d
  'aaabbbb': s => /^(\d)\1{2}(\d(?<!\1))\2{3}$/.test(s),
  'aaaabbbb': s => /^(\d)\1{3}(\d(?<!\1))\2{3}$/.test(s),
  'abbcbba': s => /^(\d)(\d(?<!\1))\2(\d(?<!\1|\2))\2{2}\1$/.test(s),
  'wan-club': s => /^[1-9][0-9]{0,2}0000$/.test(s),
  'xxxaaaaaaaa': s => /^\d{3}(\d)\1{7}$/.test(s),

  // 0xdigits
  '0x9': s => /^0x\d$/.test(s),
  '0x99': s => /^0x\d{2}$/.test(s),
  // 0x999 in 3d
  // 0x10k in 4d
  '1-hex': s => /^0x[\da-f]$/.test(s),
  '2-hex': s => /^0x[\da-f]{2}$/.test(s),
  '3-hex': s => /^0x[\da-f]{3}$/.test(s),
};

export function detectPatterns(domain: string): Set<string> {
  const parts = domain.split('.')
  if (parts.length !== 2 || !parts[0]) {
    throw new Error(`invalid domain: ${domain}`);
  }
  const name = parts[0];
  const patternSet = new Set<string>();

  for (const pattern in patternMatcherMap) {
    if (patternMatcherMap[pattern]?.(name)) {
      patternSet.add(pattern);
    }
  }

  return patternSet;
}

import test from 'ava';
import got from 'got';
import { detectPatterns } from './dist/index.js';

const RAREID_API_ENDPOINT = 'https://api.rare.id/api';

const slugSet = new Set([
  // 3d
  '999', 'aaa', 'abc', 'abb', 'aba', 'aab', '360-degree', '0x999', '999jp', '999cn', 'arabic999', 'flag999',

  // 4d
  '10k',
  // TODO: rare4d
  'abcd', 'aaaa', 'abbb', 'aabb', 'aaab', 'abaa', 'aaba', 'abba', 'abab', 'aabc', 'abcc', 'abbc', '0xxx', '00xx', '0x0x', '0xx0', 'xx00', 'xx88', 'xx69', 'times-table', 'mmdd', '0x10k', 'arabic10k',

  // 5d
  '100k', 'aaaaa', 'abcde', 'abbbb', 'aabbb', 'aaabb', 'aaaab', 'abbba', 'abaaa', 'aabaa', 'aaaba', 'ababa', 'xabcd', 'xx000', '00xx0', '000xx', 'xx420', 'aaabc', 'aabbc', 'aabcc', 'abccc', 'abbcc', 'abbbc', 'abcba', 'xxx69', '69xxx', '00xxx', 'xxx00',

  // 6d
  'aaaaaa', 'abbbbb', 'aabbbb', 'aaabbb', 'aaaabb', 'aaaaab', 'abbabb', 'ababab', '00xx00', 'aabbcc', 'abcccc', 'abbbbc', 'aaaabc', 'abcabc', 'xxx420', '420xxx', 'xxx000', '000xxx',
  // TODO: 'a-share-code',
  'xxxx69',

  // gt6d
  'aaabbbb', 'aaaabbbb', 'abbcbba', 'wan-club', 'xxxaaaaaaaa',

  // 0xdigits
  '0x9', '0x99',
  '0x999', '0x10k',
  '1-hex', '2-hex', '3-hex',
]);

let fixtures: Record<string, string[]>;

interface ICollection {
  id: string;
  slug: string;
  name: Record<string, string>;
  num_name: number;
  isMintedOut: boolean;
  parent: boolean;
  icon: string;
  summary: string;
  tokenSetId: string;
  subs: ICollection[];
  names?: string[];
}

function listCollection() {
  return got(`${RAREID_API_ENDPOINT}/collections`).json<ICollection[]>();
}

function getCollection(id: string) {
  return got(`${RAREID_API_ENDPOINT}/collections/${id}?compact=false`).json<ICollection>();
}

async function makeFixtures() {
  const collections = await listCollection();
  const digitsCategory = collections.find(x => x.slug === 'digits');
  if (!digitsCategory) throw new Error('[makeFixtures] failed to retrieve fixtures from Rare.ID');
  const tasks: Promise<ICollection>[] = [];
  digitsCategory.subs.forEach(subCategory => {
    subCategory.subs.forEach(collection => {
      if (slugSet.has(collection.slug)) {
        tasks.push(getCollection(collection.id));
      }
    });
  });
  const collectionDetails = await Promise.all(tasks);
  fixtures = collectionDetails.reduce((total, current) => {
    const { slug, names } = current;
    if (names) {
      names.forEach(name => {
        const domain = `${name}.eth`;
        if (!total[domain]) {
          total[domain] = [];
        }
        total[domain].push(slug);
      });
    }
    return total;
  }, {} as Record<string, string[]>);
}

test.before(async t => {
  t.timeout(300000);
	await makeFixtures();
});

test('detectPatterns() should throw for invalid domain', t => {
  t.throws(() => detectPatterns('.eth'), { message: 'invalid domain: .eth' });
  t.throws(() => detectPatterns('a.b.eth'), { message: 'invalid domain: a.b.eth' });
});

test('detectPatterns() should detect Rare.ID digits patterns', async t => {
  await t.notThrowsAsync(Promise.all(
    Object.keys(fixtures).map(domain => t.deepEqual(detectPatterns(domain), new Set(fixtures[domain]))),
  ));
});

# rareid-utils

Utilities for [Rare.ID][1].

## Installation

```sh
npm install rareid-utils
```

## Usage

```js
import { detectPatterns } from 'rareid-utils';

// Detect pattern of a domain
console.log(detectPatterns('0311.eth'));
// > Set(4) { 'ABCC', '0XXX', '10K', 'MMDD' }
```

## API

### detectPatterns(domain)

> Currently only digits pattern (except `rare4d` and `a-share-code`) defined at [Rare.ID][2] are supported

Returns a set of detected patterns of the given domain.

#### domain

Type: `string`

Any domain, e.g: `0311.eth`.



[1]: https://rare.id
[2]: https://rare.id/search?tab=category

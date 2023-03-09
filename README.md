# nsu

Name Service Utilities.

## Installation

```sh
npm install nsu
```

## Usage

```js
import { detectPatterns } from 'nsu';

// Detect pattern of a domain
console.log(detectPatterns('0311.eth'));
// > Set(4) { 'ABCC', '0XXX', '10K', 'MMDD' }
```

## API

### detectPatterns(domain)

> Currently only numeric pattern (except rare4d and a-share-code) defined at [Rare.ID](https://rare.id/search?tab=category) are supported

Returns a set of detected patterns of the given domain.

#### domain

Type: `string`

Any domain, e.g: `0311.eth`.

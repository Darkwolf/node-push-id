# Push ID
## Install
#### ECMAScript (Node.js v12.x LTS or higher)
`npm i --save @darkwolf/push-id.mjs`
#### CommonJS (Node.js v10.x LTS or higher)
`npm i --save @darkwolf/push-id.cjs`
## Using
```javascript
// ECMAScript
import PushID from '@darkwolf/push-id.mjs'

// CommonJS
const PushID = require('@darkwolf/push-id.cjs')

const pushId = PushID.generate() // => '-MSAWSy_mM81Jtpapkpf'
const base62PushId = PushID.generateBase62() // => '0SNRDNOKchaXO5SgpJ32'
const base58PushId = PushID.generateBase58() // => '1jLoJJiLyzyxpjjcnsvf'
```
## [API Documentation](https://github.com/Darkwolf/node-push-id/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)

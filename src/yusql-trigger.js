import { readFileSync, writeFileSync } from 'node:fs';

fetch('https://yusql.onrender.com/healthcheck').then((response) => {
  const message =
    (response.ok ? `[yusql]: running` : `[yusql]: suspended`) + ` (last check: ${new Date().toLocaleString()})`;

  const lastContent = readFileSync('./README.md', { encoding: 'utf8', flag: 'r' }).split('\n');
  const lastMsgIdx = lastContent.findIndex((line) => line.includes('[yusql]'));
  if (lastMsgIdx === -1) lastContent.push(message);
  else lastContent[lastMsgIdx] = message;

  writeFileSync('./README.md', lastContent.filter(Boolean).join('\n'), { encoding: 'utf8', flag: 'w' }, (err) => {
    if (err) {
      console.error(`[yusql]: error while writeFileSync (${err})`);
      return;
    }
  });
});

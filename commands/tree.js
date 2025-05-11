// commands/tree.js
const fs = require('fs-extra');
const PADDING = 4; // horizontal spacing between columns

module.exports = {
  name: 'tree',
  description: 'Show a full family tree with generations and arrows',
  async execute(message) {
    const target = message.mentions.members.first() || message.member;
    const data = await fs.readJson('data/social.json');
    const guild = message.guild;

    const tag = id => guild.members.cache.get(id)?.user.tag || id;

    // 1) Build ancestor lines: map depth (<0) -> Set of IDs
    const ancestors = {};
    const gatherUp = (id, depth) => {
      if (depth < -5) return; // guardrail
      const ps = data.parents[id] || [];
      for (const pid of ps) {
        ancestors[depth] = ancestors[depth] || new Set();
        ancestors[depth].add(pid);
        gatherUp(pid, depth - 1);
      }
    };
    gatherUp(target.id, -1);

    // 2) Build descendant lines: map depth (>0) -> Set of IDs
    const descendants = {};
    const gatherDown = (id, depth) => {
      if (depth > 5) return;
      for (const [child, ps] of Object.entries(data.parents)) {
        if (ps.includes(id)) {
          descendants[depth] = descendants[depth] || new Set();
          descendants[depth].add(child);
          gatherDown(child, depth + 1);
        }
      }
    };
    gatherDown(target.id, 1);

    // 3) Merge into one map: depth -> array of tags
    const allGens = {};
    for (const [d, set] of Object.entries(ancestors)) {
      allGens[Number(d)] = Array.from(set).map(tag);
    }
    allGens[0] = [tag(target.id)];
    for (const [d, set] of Object.entries(descendants)) {
      allGens[Number(d)] = Array.from(set).map(tag);
    }

    // 4) Determine min/max depth
    const depths = Object.keys(allGens).map(Number);
    const minD = Math.min(...depths);
    const maxD = Math.max(...depths);

    // 5) Build each line with padding
    const lines = [];
    for (let d = minD; d <= maxD; d++) {
      const names = allGens[d] || [];
      // pad each name to fixed width
      const padded = names.map(n => n.padEnd(15, ' '));
      lines.push(padded.join(' '.repeat(PADDING)));
      // after printing names, if there's a next gen, draw arrows
      if (d < maxD) {
        // for each name, draw a down arrow
        const numCols = padded.length;
        if (numCols) {
          let arrowLine = '';
          for (let i = 0; i < numCols; i++) {
            arrowLine += padded[i].replace(/./g, ' ') + ' '.repeat(PADDING);
          }
          // place a single arrow under each column center
          const arr = arrowLine.split('');
          padded.forEach((_, idx) => {
            const start = idx * (15 + PADDING) + Math.floor(15/2);
            arr[start] = '↓';
          });
          lines.push(arr.join(''));
        }
      }
    }

    const output = '```\n' + lines.join('\n') + '\n```';
    if (output.length > 1900) {
      return message.channel.send('Family tree too large to display.');
    }
    message.channel.send(output);
  }
};

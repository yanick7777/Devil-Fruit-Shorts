"""Write shorts/<name>/PLAN.md from script.json (title, structure, facts, lines, "plan" notes) and the build's cues.
usage: python3 tools/mkplan.py <name>"""
import json, re, subprocess, sys
n = sys.argv[1]; S = json.load(open(f'shorts/{n}/script.json')); tl = json.load(open(f'build/{n}/timeline.json'))
P = S.get('plan', {})
table = subprocess.run(['python3', 'tools/plan.py', f'build/{n}/timeline.json', f'build/{n}/cues.json'], capture_output=True, text=True).stdout
lines = '\n'.join(f"| {l['id']} | {re.sub(r'#\\w+', '', l['text'])} |" for l in S['lines'])
facts = '\n'.join(f'- {f}' for f in S['facts'])
cast = '\n'.join(f'- {c}' for c in P.get('cast', []))
out = f"""# PLAN: {S['title']} ({P.get('english', '')})

9:16, 1080×1920, 30 fps, **{tl['duration']:.1f} s**, timed to your Fish Audio take (split into lines with tools/align.py, used as-is). No background music.

**Structure (no forced forms):** {S['structure']}. Pedestals read {P.get('labels', '')}.

## 1. Fruit design sheet

{P.get('fruit', '')} Still: `review/fruit_sheet.png`.

## 2. Script and fact check

| Line | Text |
|---|---|
{lines}

Facts used (One Piece Wiki via search):
{facts}

## 3. Cast (all full-body)

- **Host:** same as before.
{cast}
- Sheet: `review/cast_sheet.png`.

## 4. Sets (all new)

{P.get('sets', '')} Only the desk room and the purple outro rays repeat.
Sheet: `review/bg_sheet.png`. Contact sheet: `review/contact_sheet.jpg`.

## 5. Shot list

{table}"""
open(f'shorts/{n}/PLAN.md', 'w').write(out); print('wrote', f'shorts/{n}/PLAN.md')

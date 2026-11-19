"""Write shorts/<name>/sheets.js. usage: mksheets.py name drawFn 'TITLE' 'note' 'col:#hex,...' 'who:expr:pose,...'"""
import sys
n, fn, title, note, cols, cast = sys.argv[1:7]
cols = ', '.join(f"['{c.split(':')[0]}', '{c.split(':')[1]}']" for c in cols.split(','))
cast = ', '.join("[" + ', '.join(f"'{p}'" for p in c.split(':')) + "]" for c in cast.split(','))
open(f'shorts/{n}/sheets.js', 'w').write(f"""import {{ makeSheet }} from '/engine/review.js';
import {{ BG }} from '/engine/bgs.js';
import {{ {fn} }} from '/engine/fruits3.js';
import {{ SETS }} from '/shorts/{n}/story.js';
export const sheet = makeSheet({{ title: '{title}', fruit: {fn}, cols: [{cols}], note: '{note}',
  cast: [{cast}], sets: SETS, BG }});
""")

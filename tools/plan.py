"""Write the shot table of PLAN.md from cues.json + timeline.json."""
import json, re, sys
tl = json.load(open(sys.argv[1])); c = json.load(open(sys.argv[2]))
words = [(ln['start'] + w['t'], re.sub(r'#\w+$', '', w['w'])) for ln in tl['lines'] for w in ln['words']]
sfx = c['sfx']
def cam(s):
    a, b = s['cam']; z = (a[0] + b[0]) / 2
    size = 'wide' if z < 1.1 else 'medium' if z < 1.3 else 'close-up'
    mv = 'push-in' if b[0] > a[0] else 'pull-back'
    roll = abs(b[3]) > 0.035 and f', roll {round(b[3] * 57.3)}°' or ''
    return f'{size}, {mv} {a[0]:.2f}→{b[0]:.2f}{roll}'
rows = ['| # | Frames | Narration | Background | Camera | Picture and effects | Banner | SFX |', '|---|---|---|---|---|---|---|---|']
for s in c['shots']:
    nar = ' '.join(w for t, w in words if s['t0'] <= t < s['t1']) or '(no voice)'
    ban = ', '.join(f"{b[0]} ({b[1]})" for b in s['banners'] if s['t0'] - 0.01 <= b[2] < s['t1']) or ''
    fx = sorted({n for t, n in sfx if s['t0'] <= t < s['t1']})
    rows.append(f"| {s['i'] + 1} | {round(s['t0'] * 30)}–{round(s['t1'] * 30) - 1} | {nar} | {s['bg']} | {cam(s)}{' **twist**' if s['twist'] else ''} | {s['name']} | {ban} | {', '.join(fx)} |")
print('\n'.join(rows))

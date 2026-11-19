"""Build script.json for batch-3 shorts straight from SCRIPTS.md. usage: python3 tools/b3script.py name..."""
import json, re, sys
NAMES = ['bubble','munch','bomb','wax','brush','rumble','flower','orochi','human','hollow','wolf','magnet','shadow','kilo','clone','love','mochi','smoke','paw','stitch','nidhoggr','axolotl','slip','sand','dice','azure','bison','giraffe','dark','revive']
AWAKEN = {'magnet','mochi'}
s = open('SCRIPTS.md').read(); b = s[s.index('# Batch 3'):]; parts = b.split('\n## ')[1:]
COLS = ['gold','red','blue','green','pink','orange','purple']
leads = {'hook': (1.6, 0.25), 'calm': (0.1, 0.35), 'sea': (0.1, 0.25), 'name': (0.05, 0.9), 'type': (0.1, 0.9), 'power1': (0.3, 0.4), 'power2': (0.55, 0.4), 'power3': (0.55, 0.4), 'peak': (0.55, 0.6), 'awaken': (0.55, 0.6), 'twist': (0.25, 0.4), 'truth': (0.1, 0.4), 'users': (0.1, 0.4), 'joke': (0.2, 0.9), 'outro': (0.2, 2.4)}
STOP = set('the a an of and to your you it so or in on at is that with even can any all its it\'s this into from for by one his her them they their was are be just right there\'s never need every come make makes then first users fruit once used have when like used'.split())
for n in sys.argv[1:]:
    i = NAMES.index(n); p = parts[i]; title = p.split('\n')[0]; text = p.split('```')[1].strip().split('\n')
    ids = ['hook','calm','sea','name','type','power1','power2','power3','awaken' if n in AWAKEN else 'peak','twist','truth','users','joke','outro']
    assert len(text) == 14, (n, len(text))
    lines = []
    for k, (lid, t) in enumerate(zip(ids, text)):
        w = t.split()
        if lid == 'hook': tagged = t.replace('bite', 'bite#red', 1); words = tagged.split(); words[-2] = words[-2] + '#purple'; tagged = ' '.join(words)
        elif lid == 'calm': tagged = "Don't panic,#red that's just a Devil#purple Fruit.#purple"
        elif lid == 'sea': tagged = 'Out of every fruit in the sea,#blue'
        elif lid == 'outro': tagged = 'Which fruit#pink do you want next?#gold Follow for more.'
        elif lid == 'name': tagged = ' '.join(x + ('#pink' if k2 >= 3 else '') for k2, x in enumerate(w))
        else:
            cands = [j for j, x in enumerate(w) if re.sub(r'\W', '', x).lower() not in STOP and len(re.sub(r'\W', '', x)) > 3]
            pick = set(sorted(cands, key=lambda j: -len(re.sub(r'\W', '', w[j])))[:2])
            tagged = ' '.join(x + (f'#{COLS[(k + j) % len(COLS)]}' if j in pick else '') for j, x in enumerate(w))
        l, tl = leads[lid]; lines.append({'id': lid, 'lead': l, 'tail': tl, 'text': tagged, 'say': t})
    out = {'title': title, 'format': '9:16', 'story': f'/shorts/{n}/story.js', 'voice': {'name': 'mb-us2', 'speed': 158, 'pitch': 48}, 'voice_override_dir': f'shorts/{n}/vo', 'voice_fx': {}, 'music': False,
           'structure': 'base powers + AWAKENED' if n in AWAKEN else 'techniques + peak (no forced forms)', 'facts': [f'Fruit look from the user\'s oparchive screenshots (refs/batch3/DESIGNS.md)'], 'plan': {'english': title, 'labels': '', 'fruit': 'Drawn from the design you sent (refs/batch3).', 'cast': [], 'sets': ''}, 'lines': lines}
    json.dump(out, open(f'shorts/{n}/script.json', 'w'), indent=1); print('wrote', n)

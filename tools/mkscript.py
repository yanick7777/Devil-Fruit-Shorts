"""Write shorts/<name>/script.json from a compact spec (python dict in a .py file passed on the command line)."""
import json, sys, runpy
spec = runpy.run_path(sys.argv[1])['SPEC']; name = spec['name']
leads = {'hook': (1.6, 0.25), 'calm': (0.1, 0.35), 'sea': (0.1, 0.25), 'name': (0.05, 0.9), 'type': (0.1, 0.9), 'power1': (0.3, 0.4), 'power2': (0.55, 0.4), 'power3': (0.55, 0.4),
         'peak': (0.55, 0.6), 'awaken': (0.55, 0.6), 'twist': (0.25, 0.4), 'truth': (0.1, 0.4), 'users': (0.1, 0.4), 'joke': (0.2, 0.9), 'outro': (0.2, 2.4)}
hook = spec.get('hook', "You take a bite#red of a weird swirly#purple fruit.")
lines = [('hook', hook), ('calm', "Don't panic,#red that's just a Devil#purple Fruit.#purple"), ('sea', 'Out of every fruit in the sea,#blue'), ('name', spec['nameLine'])] + spec['lines'] + [('outro', 'Which fruit#pink do you want next?#gold Follow for more.')]
out = {'title': spec['title'], 'format': '9:16', 'story': f'/shorts/{name}/story.js', 'voice': {'name': 'mb-us2', 'speed': 158, 'pitch': 48}, 'voice_override_dir': f'shorts/{name}/vo',
       'voice_fx': {}, 'music': False, 'structure': spec['structure'], 'facts': spec['facts'], 'plan': spec['plan'], 'lines': []}
for lid, text in lines:
    l, t = leads[lid]; out['lines'].append({'id': lid, 'lead': l, 'tail': t, 'text': text, 'say': ' '.join(w.split('#')[0] for w in text.split())})
json.dump(out, open(f'shorts/{name}/script.json', 'w'), indent=1); print('wrote', name)

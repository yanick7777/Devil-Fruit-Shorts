"""Transcribe each split voice line with pocketsphinx so the cuts can be checked. usage: python3 tools/asrcheck.py name"""
import json, sys, subprocess, re
from pocketsphinx import Decoder
n = sys.argv[1]; S = json.load(open(f'shorts/{n}/script.json')); d = Decoder(samprate=16000)
for l in S['lines']:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', f"shorts/{n}/vo/{l['id']}.wav", '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt(); hyp = d.hyp().hypstr if d.hyp() else ''
    print(f"{l['id']:7s} | {re.sub(r'#\\w+', '', l['text'])[:48]:48s} | {hyp if "--full" in sys.argv else hyp[:60]}")

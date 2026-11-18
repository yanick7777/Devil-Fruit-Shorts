"""Contact sheet: one still per shot (mid frame) with shot number, time and background label.
usage: python3 tools/contact.py build/<short>/cues.json <stills_prefix> <out.jpg>"""
import json, sys, glob
from PIL import Image, ImageDraw, ImageFont
cues = json.load(open(sys.argv[1])); pre = sys.argv[2]
shots = cues["shots"]; cols = 6; tw, th = 240, 427
rows = (len(shots) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw, rows * (th + 46)), (24, 20, 36)); d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
except Exception: font = ImageFont.load_default()
for k, s in enumerate(shots):
    t = (s["t0"] + s["t1"]) / 2; im = Image.open(f"{pre}_{t:.2f}.jpg").resize((tw, th))
    x, y = (k % cols) * tw, (k // cols) * (th + 46); sheet.paste(im, (x, y))
    d.text((x + 6, y + th + 4), f"#{k+1}  {s['t0']:.1f}-{s['t1']:.1f}s", fill=(255, 210, 63), font=font)
    d.text((x + 6, y + th + 24), s["bg"], fill=(220, 220, 240), font=font)
sheet.save(sys.argv[3], quality=88); print(sys.argv[3], sheet.size)

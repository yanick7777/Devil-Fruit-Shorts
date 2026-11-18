# PLAN: Mera Mera no Mi (Flame-Flame Fruit)

9:16, 1080×1920, 30 fps, **55.5 s (1,665 frames)**. Structure copies the reference template, scaled to this script.
The voice is a placeholder TTS track until you record. Drop takes into `shorts/mera-mera/vo/<line id>.wav`
(`hook`, `calm`, `sea`, `name`, `logia`, `form1`, `form2`, `form3`, `form4`, `never`, `reborn`, `sabo`, `joke`, `outro`),
rerun `./make.sh`, and every shot re-times itself to your recording.

## 1. Fruit design sheet

Source: One Piece Wiki, *Mera Mera no Mi*, Appearance section. The wiki host (onepiece.fandom.com) is blocked from
this session, so the text was read through a mirror of the same article:

> "The Mera Mera no Mi is a round orange fruit, composed of many flame-shaped components with swirl patterns on each one,
> and has a swirled stem on the top."

| Part | Design | Colour |
|---|---|---|
| Overall shape | Round, slightly taller at the top where the bumps point up | – |
| Body | Many flame-shaped bumps covering the whole ball, in about 6 rings from bottom to top, each pointing upward with a small curled tip | bumps `#ff9630`, lit bumps `#ffb54a`, shadow between bumps `#e86f1c` |
| Swirls | One spiral on **every** bump, sitting in the lower half of the bump, alternating clockwise / anticlockwise | `#b9480f` |
| Stem | One spiral (curled) stem on top | `#3d6b35` (the wiki gives no stem colour: dark green, like other Devil Fruit stems, *unconfirmed*) |
| Style | Thick navy outline `#1b1530`, flat fills, one white highlight arc upper-left and a small glint | – |
| Forbidden | No face, eyes, mouth, arms, legs or expression. It is a plain object in every shot (drop, bite, reveal, trophy, reborn) | – |

Still: `review/fruit_sheet.png` (front, three turns, prop size). The bite uses the same drawing with a bite cut out.
The anime and manga both show it orange; no colour difference is noted on the wiki.

## 2. Script (your version) and fact check

| Line | Text | Check |
|---|---|---|
| hook | You take a bite of a weird orange fruit. | ✓ (the fruit is orange) |
| calm | Don't panic, that's just a Devil Fruit. | ✓ |
| sea / name | Out of every fruit in the sea, you got the Flame-Flame Fruit, | ✓ English name |
| logia | a Logia that allows you to turn into fire and use a whole list of fire powers. | ✓ Logia, create/control/become fire |
| form1 | First, your whole body turns into fire, so punches and bullets go right through you. | ✓ Logia intangibility (Haki can still hit; not said, not shown) |
| form2 | Then your fist catches fire and shoots a column of flame strong enough to punch through a bunch of ships. | ✓ Hiken (Fire Fist); Ace sank five Baroque Works ships with one in Alabasta |
| form3 | You can even make little fireballs float around your enemy, then send them all in at once. | ✓ Hotarubi Hidaruma (Fire Flies) |
| form4 | Your strongest attack is a giant fireball that looks like a sun. | ✓ Dai Enkai Entei (Flame Emperor) |
| never | And this fire never goes out. | ⚠ figurative, not a fruit rule. Staged as a lead-in to the next line, not as a power |
| reborn | When you die, the fruit comes back and finds a new user. | ✓ the power reappears in a fruit after the user dies (it is found and eaten, it doesn't seek anyone out) |
| sabo | After Ace died, Sabo won it in a tournament. | ✓ Corrida Colosseum prize, won by Sabo (Dressrosa arc, spoiler) |
| joke | Users of this fruit never pay a heating bill. | joke line |
| outro | Which fruit do you want next? Follow for more. | outro |

The script only names this one fruit. Other fruits appear only as dark, nameless silhouettes in shot 4, as the template asks.

**FORM 1-4 mapping.** The fruit has no official stages, so the four forms are its real techniques in rising scale:
1 fire body (intangibility), 2 Fire Fist, 3 Fire Flies, 4 Flame Emperor. The labels on screen only say FORM 1-4.

## 3. Cast

Every character is a **full-body** figure (head, torso, posable arms and hands, legs and shoes), with poses idle, hold, sip, raise, punch, cheer, shrug and hold-up. Props (mug, fruit, fireballs) attach to the hands. Standing shots show the whole figure; only the desk room hides the legs behind the desk. Test sheet: `review/cast_sheet.png`.


- **Host (original):** same face build as the reference style (big round head, thick navy outline, white rim light, glinting eyes with heavy lids and tan eye bags). Messy black hair, small round glasses, no stubble, teal hoodie over a white tee, pink steaming mug, dark-blue jeans, white sneakers. Expressions: calm, smug, shock, grin, sad, worried, yuck.
- **Enemy (original):** bearded pirate, purple polka-dot bandana, navy/white striped shirt, red sash, brown trousers, black boots. Expressions: smug, worried, shock, hit.
- **Portgas D. Ace / Sabo:** drawn from their series looks (orange hat with beads, freckles, bare chest, black shorts and boots; top hat with goggles, long blue coat, cravat, scar, boots) in the same art style.

## 4. Effects and sound (applies to every shot)

- Pop-in bounce (5 frames) on characters, props, marks and banners; FORM banners slide in from the top.
- Evolve transition (forms 2, 3, 4): 0.45 s ghost cross-dissolve old form → new form, yellow-white radial flash, expanding glow ring, gold FORM banner slides in.
- Halo glow behind the current form (pink, gold for the peak); yellow shine lines on powered parts; red-orange impact star with a 7-frame camera shake; red/yellow `!?` and purple `?` marks by heads.
- Every shot: smootherstep camera glide with a slow push-in and a punch on the cut, soft blurred background edge, floating dust, and something popping in about every second.
- Captions: 1-2 words, pop on the spoken word, lower third, drop shadow. 42% of captions carry a key word, enlarged, tilted and coloured to match what it names (pink fruit, gold stages and power, blue water and space, purple dark things, green time and nature, red and orange fire and danger).
- Sound: music loop about 6 dB under the voice, **stops at the twist (shot 18, "never goes out") with a low hit**, then a low drone until the joke sting brings the music back. SFX sit at about 50% of voice level, peaks capped at 0.7× the voice peak: whooshes on cuts, a shimmer on the fruit reveal, a crunch on the bite, ignite and roar on fire, impacts on hits, waves and gulls on sea shots, wind on the cliff.

## 5. Rule check

| Rule | Result |
|---|---|
| New background every 4-5 s, 10 or more, never twice in a row | 19 background runs, **18 different**, longest run 4.8 s (pedestal stage), never repeated back to back ✓ |
| Desk room only at start and end | shots 1-2 and 25 only ✓ |
| No shot longer than about 3 s | 25 shots, longest 3.3 s (the joke and the outro rays), the rest ≤ 3 s ✓ |
| Banners about every 6-8 s, around 8, colour-matched | 9 banners, about one every 6 s: pink YOUR FRUIT, pink FLAME-FLAME FRUIT, gold FORM 2/3/4, red NEVER GOES OUT, green IT COMES BACK, gold HEATING BILL: $0, pink NEXT? ✓ |
| About 4 in 10 captions with a coloured key word, colour changes caption to caption | 35 of 83 (42%) ✓; the only same-colour neighbours are one name split over two captions (DEVIL / FRUIT, HEATING / BILL) |
| Fruit has no face or limbs and matches the design sheet | ✓ |
| One fruit only | ✓ |

## 6. Shot plan

Frames are at 30 fps. "Picture and effects" lists who and what is on screen.

| # | Frames | Narration | Background | Camera | Picture and effects | Banner | SFX |
|---|---|---|---|---|---|---|---|
| 1 | 0–48 | You | desk | wide, push-in 1.00→1.07 | Hook (desk room): host sips coffee, the fruit drops onto the plate, wide-eyed shock with !? |  | fall, shock, sip, thunk |
| 2 | 49–113 | take a bite of a weird orange fruit. | desk | close-up, push-in 1.40→1.50 | The bite (desk close-up): 2-frame dip, bite, disgusted face, light flash; pink YOUR FRUIT banner | YOUR FRUIT (pink) | crunch, yuck |
| 3 | 114–197 | Don't panic, that's just a Devil Fruit. | plain | wide, push-in 1.06→1.12 | Don't panic (close-up on a plain lavender backdrop): host calms down, holds the bitten fruit |  | whoosh |
| 4 | 198–261 | Out of every fruit in the sea, you got the | rays:orange | wide, push-in 1.00→1.10, roll 2° | Out of every fruit: orange rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes |  | rumble, whoosh |
| 5 | 262–328 | Flame-Flame Fruit, | pinkDots | medium, push-in 1.05→1.16 | Fruit reveal: the Mera Mera no Mi slowly rotating on pink with shimmer; pink FLAME-FLAME FRUIT banner | FLAME-FLAME FRUIT (pink) | ding, shimmer, whoosh |
| 6 | 329–393 | a Logia that allows you to turn into fire and | stage | wide, push-in 1.00→1.06 | Pedestal stage (wide): FORM 1-4 on purple pedestals, dark progress bar starts filling yellow |  | pop, whoosh |
| 7 | 394–473 | use a whole list of fire powers. | stage | close-up, push-in 1.28→1.36, roll 3° | Pedestal stage (close): forms 2-4 pop in, bar fills, LEVEL UP, gold halo on FORM 4 |  | levelup, pop |
| 8 | 474–543 | First, your whole body turns into fire, | beach | medium, push-in 1.15→1.25 | Form 1 close-up (bright beach): the host's body turns into fire, yellow shine lines; scope overlay |  | fireloop, ignite |
| 9 | 544–626 | so punches and bullets go right through you. | deck | wide, push-in 1.05→1.14 | Form 1 reaction (ship deck): the pirate's punch and bullets go right through the fire body; pirate shocked !? |  | bullets, shock, swish, whoosh |
| 10 | 627–690 | Then your fist catches fire and | grid | wide, push-in 1.00→1.10 | Form 2 evolve (dark gold grid): ghost of form 1 dissolves into the flaming fist, flash + glow ring; gold FORM 2 banner slides in | FORM 2 (gold) | evolve, ignite, whoosh |
| 11 | 691–756 | shoots a column of flame strong enough to | sea | medium, push-in 1.08→1.14, roll 2° | Form 2 blast (open sea): a column of flame shoots from the fist; pirate in the foreground worried; heat meter rises |  | blast |
| 12 | 757–827 | punch through a bunch of ships. | sea | close-up, push-in 1.30→1.38, roll -3° | Form 2 impact (closer on the ships): the flame punches through a row of ships, impact stars, 7-frame shake |  | impact |
| 13 | 828–903 | You can even make little fireballs float | harbor | wide, push-in 1.00→1.08 | Form 3 evolve (sunset harbor): fist becomes little fireballs floating from the host's hand; magnifier shows the tiny pirate inside a swirl | FORM 3 (gold) | evolve, twinkle, whoosh |
| 14 | 904–936 | around your enemy, | harbor | close-up, push-in 1.30→1.38, roll 2° | Form 3 close (same harbor): fireballs float around the pirate, shown in the magnifier circle |  | twinkle |
| 15 | 937–998 | then send them all in at once. | cliff | medium, pull-back 1.16→1.08 | Form 3 hit (island cliff): all the fireballs fly in at once and explode on the pirate; red impact star, 7-frame shake, !? |  | impact, pops, whoosh |
| 16 | 999–1054 | Your strongest attack is a | darkHalo | wide, push-in 1.00→1.08 | Form 4 peak (dark backdrop): evolve into a giant sun-like fireball with a gold halo; gold FORM 4 banner; host tiny below | FORM 4 (gold) | evolve, rumble, whoosh |
| 17 | 1055–1137 | giant fireball that looks like a sun. | darkHalo | medium, pull-back 1.25→1.12 | Form 4 low angle (same backdrop): the sun swells to full size above the tiny host, shine lines | FORM 4 (gold) | boom |
| 18 | 1138–1202 | And this fire never goes out. | rays:red | medium, push-in 1.00→1.28, roll 4° **twist** | Twist (red rays): an eternal flame that never goes out; music stops, low hit, push-in with roll; red NEVER GOES OUT banner | NEVER GOES OUT (red) | fireloop, sting |
| 19 | 1203–1241 | When you die, the fruit | navyGrid | medium, push-in 1.10→1.16 | When you die (navy grid, circle overlay): the fruit fades away inside the circle |  | fade, whoosh |
| 20 | 1242–1312 | comes back and finds a new user. | navyGrid | close-up, push-in 1.30→1.38, roll -2° | It comes back (closer, same grid): the fruit reappears with sparkles, a ? silhouette of a new user pops in; green IT COMES BACK banner | IT COMES BACK (green) | pop, shimmer |
| 21 | 1313–1340 | After Ace died, | night | medium, push-in 1.15→1.20 | After Ace died (night-blue backdrop): Portgas D. Ace's ghostly portrait with a fire aura fades out |  | whoosh |
| 22 | 1341–1404 | Sabo won it in a tournament. | colosseum | wide, push-in 1.00→1.10 | Colosseum: Sabo pops in and wins the tournament trophy with the fruit on top |  | fanfare, pop, whoosh |
| 23 | 1405–1504 | Users of this fruit never pay a heating bill. | snow | medium, push-in 1.08→1.16 | Joke (snowy cabin): host warm in a hoodie with a cozy fire glow while snow falls; gold HEATING BILL: $0 banner | HEATING BILL: $0 (gold) | jokesting, whoosh |
| 24 | 1505–1602 | Which fruit do you want next? Follow for more. | rays:purple | wide, push-in 1.00→1.10 | Outro (purple rays): host with big ? marks, pink NEXT? banner | NEXT? (pink) | pop, whoosh |
| 25 | 1603–1664 | (no voice) | desk | medium, push-in 1.12→1.18 | Back in the desk room: host sips coffee, steam rising |  | sip |

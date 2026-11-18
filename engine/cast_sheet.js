import { drawPerson, mug, OL } from './art.js';
export function sheet(c) {
  c.width = 2400; c.height = 1500; const x = c.getContext('2d'); x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
  const row = (who, exprs, y) => exprs.forEach((e, i) => { x.drawImage(drawPerson({ who, expr: e }), 20 + i * 400, y, 380, 510); x.font = '34px "Lilita One"'; x.fillStyle = OL; x.fillText(`${who}: ${e}`, 60 + i * 400, y + 540); });
  row('host', ['calm', 'smug', 'shock', 'grin', 'sad', 'worried'], 0);
  mug(x, 2320, 330, 0.8, 0.5);
  row('enemy', ['smug', 'worried', 'hit'], 740); [['ace','smug'],['sabo','grin']].forEach(([w,e],i)=>{ x.drawImage(drawPerson({who:w,expr:e}), 1220+i*400, 740, 380, 510); x.font='34px "Lilita One"'; x.fillStyle=OL; x.fillText(w, 1360+i*400, 1280); });
  x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, 0, 0);
}

import sys,json,hashlib,re
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
text=''.join(chr(i) for i in range(32,127))+'，。！？：；（）《》·—…＋−→←　'
for p in Path('src').rglob('*'):
 if p.suffix in ['.js','.jsx','.css','.json']: text+=p.read_text(encoding='utf-8')
text+=Path('index.html').read_text(encoding='utf-8')
report=[]
versions={}
for name in ['misans-normal.ttf','pangmen-display.ttf','zaozigongfang-yihei.otf']:
 p=Path('public/assets/fonts')/name; dest=p.with_name(p.stem+'-subset.woff2')
 # Keep the source font timestamp so identical text produces identical assets.
 font=TTFont(p,recalcTimestamp=False); cmap=font.getBestCmap(); required=set(map(ord,text)) & set(cmap)
 options=subset.Options();options.flavor='woff2';options.layout_features=['*']
 worker=subset.Subsetter(options=options);worker.populate(unicodes=sorted(required));worker.subset(font);font.flavor='woff2';font.save(dest)
 assert required <= set(TTFont(dest).getBestCmap())
 version=hashlib.sha256(dest.read_bytes()).hexdigest()[:12]
 versions[dest.name]=version
 chinese={ord(c) for c in text if 0x3400<=ord(c)<=0x9fff or 0x20000<=ord(c)<=0x3134f}
 report.append({'font':name,'fullWoff2':p.with_suffix('.woff2').stat().st_size,'subset':dest.stat().st_size,'characters':len(required),'version':version,'unsupportedChinese':''.join(chr(c) for c in sorted(chinese-set(cmap)))})
# Update both @font-face sources and preload links. Old cached subsets must not
# be reused when newly published text introduces additional characters.
for target in ['src/styles.css','src/SpatialIndex.css','index.html']:
 p=Path(target); original=p.read_text(encoding='utf-8'); updated=original
 for filename,version in versions.items():
  pattern=r'(assets/fonts/'+re.escape(filename)+r')(?:\?v=[0-9a-f]+)?'
  updated=re.sub(pattern,lambda match:match.group(1)+'?v='+version,updated)
 if updated!=original: p.write_text(updated,encoding='utf-8')
Path('output/font-subset-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report))

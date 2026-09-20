import sys,json,hashlib
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
text=''.join(chr(i) for i in range(32,127))+'，。！？：；（）《》·—…＋−→←　'
for p in Path('src').rglob('*'):
 if p.suffix in ['.js','.jsx','.css','.json']: text+=p.read_text(encoding='utf-8')
text+=Path('index.html').read_text(encoding='utf-8')
report=[]
for name in ['misans-normal.ttf','pangmen-display.ttf','zaozigongfang-yihei.otf']:
 p=Path('public/assets/fonts')/name; dest=p.with_name(p.stem+'-subset.woff2')
 font=TTFont(p); cmap=font.getBestCmap(); required=set(map(ord,text)) & set(cmap)
 options=subset.Options();options.flavor='woff2';options.layout_features=['*']
 worker=subset.Subsetter(options=options);worker.populate(unicodes=required);worker.subset(font);font.flavor='woff2';font.save(dest)
 assert required <= set(TTFont(dest).getBestCmap())
 report.append({'font':name,'fullWoff2':p.with_suffix('.woff2').stat().st_size,'subset':dest.stat().st_size,'characters':len(required)})
Path('output/font-subset-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report))

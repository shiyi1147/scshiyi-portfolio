const fs=require('fs'),path=require('path'),crypto=require('crypto'),{spawnSync}=require('child_process');
const root=path.resolve(__dirname,'..'),content=fs.readFileSync(path.join(root,'src/archiveContent.js'),'utf8');
const projects=JSON.parse(content.slice(content.indexOf('['),content.lastIndexOf('];')+1));
const source=projects.find(p=>p.id==='archive-film').items.find(item=>item.video).video,input=path.resolve(root,'public',source),manifest=path.join(root,'src/filmPreviewMedia.json');
if(!input.startsWith(path.join(root,'public')+path.sep))throw Error('Film source must be inside public assets');
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const sourceSha256=sha(input),config={duration:12,start:.5,blend:.5,fps:24,crf:25,pixelAspect:1,variants:[{name:'desktop',width:960,maxrate:'750k'},{name:'mobile',width:640,maxrate:'450k'}]};
const previous=fs.existsSync(manifest)?JSON.parse(fs.readFileSync(manifest,'utf8')):null;
if(previous?.sourceSha256===sourceSha256&&JSON.stringify(previous.config)===JSON.stringify(config)&&config.variants.every(v=>previous[v.name]&&fs.existsSync(path.join(root,'public',previous[v.name].src))&&sha(path.join(root,'public',previous[v.name].src))===previous[v.name].sha256)){console.log('Film previews already match source and settings.');process.exit(0);}
const ffmpeg=process.env.PORTFOLIO_FFMPEG||'ffmpeg',ffprobe=process.env.PORTFOLIO_FFPROBE||'ffprobe',out={source,sourceSha256,config};
const temporary=path.join(root,'tmp/film-preview-build'),destination=path.join(root,'public/assets/motion-previews');fs.mkdirSync(temporary,{recursive:true});fs.mkdirSync(destination,{recursive:true});
for(const variant of config.variants){
 const output=path.join(temporary,`film-cloud-${variant.name}.mp4`);
 // End on the source frame where the main segment begins, keeping the loop calm.
 const filter=`[0:v]scale=${variant.width}:-2:flags=lanczos,setsar=1,fps=${config.fps},format=yuv420p,split=2[body][head];[body]trim=start=${config.start}:end=${config.start+config.duration},setpts=PTS-STARTPTS[main];[head]trim=start=0:end=${config.blend},setpts=PTS-STARTPTS[lead];[main][lead]xfade=transition=fade:duration=${config.blend}:offset=${config.duration-config.blend},format=yuv420p[out]`;
 const result=spawnSync(ffmpeg,['-y','-hide_banner','-loglevel','error','-threads','2','-filter_complex_threads','1','-i',input,'-filter_complex',filter,'-map','[out]','-an','-c:v','libx264','-preset','slow','-crf',String(config.crf),'-maxrate',variant.maxrate,'-bufsize',variant.name==='desktop'?'1500k':'900k','-g','48','-keyint_min','48','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',output],{encoding:'utf8',windowsHide:true});if(result.status!==0)throw Error(result.stderr||result.error||'Preview encoding failed');
 const probe=spawnSync(ffprobe,['-v','error','-show_entries','format=duration:stream=codec_name,width,height,codec_type','-of','json',output],{encoding:'utf8',windowsHide:true});if(probe.status!==0)throw Error(probe.stderr||probe.error);const metadata=JSON.parse(probe.stdout),video=metadata.streams.find(s=>s.codec_type==='video');
 if(metadata.streams.some(s=>s.codec_type==='audio')||Math.abs(Number(metadata.format.duration)-config.duration)>.1)throw Error('Unexpected preview tracks or duration');
 const hash=sha(output),src=`assets/motion-previews/film-cloud-${variant.name}-${hash.slice(0,12)}.mp4`;fs.copyFileSync(output,path.join(root,'public',src));out[variant.name]={src,sha256:hash,bytes:fs.statSync(output).size,width:video.width,height:video.height,duration:Number(metadata.format.duration)};
 console.log(JSON.stringify({variant:variant.name,...out[variant.name]}));
}
if(sha(input)!==sourceSha256)throw Error('Original film changed unexpectedly');fs.writeFileSync(manifest,JSON.stringify(out,null,2)+'\n');

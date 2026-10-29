import {mkdtempSync,cpSync,readdirSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const remote='https://github.com/liaoc1420-coder/liao-cong.git';
function run(command,args,options={}){const result=spawnSync(command,args,{stdio:'inherit',...options});if(result.status!==0)throw new Error(`${command} failed (${result.status})`);return result}
run(process.execPath,['scripts/prepare-catalog.mjs']);
run(process.execPath,['node_modules/vite/bin/vite.js','build'],{env:{...process.env,VITE_BASE_PATH:'/liao-cong/'}});
const folder=mkdtempSync(join(tmpdir(),'liao-cong-pages-'));
try{
 run('git',['init','-b','gh-pages',folder]);
 // Reuse local Git objects so identical media is not uploaded twice.
 const common=spawnSync('git',['rev-parse','--git-common-dir'],{encoding:'utf8'});
 if(common.status===0)writeFileSync(join(folder,'.git/objects/info/alternates'),resolve(common.stdout.trim(),'objects')+'\n');
 run('git',['remote','add','origin',remote],{cwd:folder});
 const check=spawnSync('git',['ls-remote','--exit-code','--heads',remote,'gh-pages'],{encoding:'utf8'});
 if(check.status===0){run('git',['fetch','--depth=1','origin','gh-pages'],{cwd:folder});run('git',['checkout','--detach','FETCH_HEAD'],{cwd:folder})}
 else if(check.status!==2)throw new Error('Unable to inspect remote publishing branch');
 for(const name of readdirSync(folder)){if(name!=='.git')rmSync(join(folder,name),{recursive:true,force:true})}
 cpSync('dist',folder,{recursive:true});writeFileSync(join(folder,'.nojekyll'),'');
 run('git',['config','user.name','Liao Cong'],{cwd:folder});
 run('git',['config','user.email','349924336+liaoc1420-coder@users.noreply.github.com'],{cwd:folder});
 run('git',['add','.'],{cwd:folder});
 const diff=spawnSync('git',['diff','--cached','--quiet'],{cwd:folder});
 if(diff.status!==0)run('git',['commit','--quiet','-m','Publish portfolio website'],{cwd:folder});
 run('git',['push','origin','HEAD:gh-pages'],{cwd:folder});
 console.log('Published: https://liaoc1420-coder.github.io/liao-cong/');
}finally{rmSync(folder,{recursive:true,force:true})}

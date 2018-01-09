/*
 * @Author: tamamadesu
 * @Date: 2018-01-09 10:49:27
 * @Last Modified by: tamamadesu
 * @Last Modified time: 2018-01-09 12:18:09
 */
const sass = require('node-sass');

const parseIndent = content =>{

	let arr   = content.split('\n');
	let space = '';

	for(let i=0;i<arr.length;i++){
		let line = arr[i];
		if(line.trim().length){
			space = ' '.repeat(line.match(/\S/).index);
			break;
		}
	}
	let newContent = arr.map(line=>{
		if(line.match(/\S/)){
			line = line.replace(space,'');
		}
		return line;
	}).join('\n');

	return newContent;
};

class styleCompiler {
    constructor(lang,content){
        this.lang    = lang;
        this.content = content;
    }
    toStr(){
        switch(this.lang){
            case 'css':
                return this.parseCss();
            case 'sass':
                return this.parseSass(true);
            case 'scss':
                return this.parseSass(false);
            default :
                console.log(`please install ${this.lang}-loader first !`);
        }
    }
    parseCss(){
        return this.content;
    }
    parseSass(indentedSyntax){
        this.content = sass.renderSync({
                        data: parseIndent(this.content),
                        indentedSyntax: indentedSyntax
                    }).css.toString();
        return this.parseCss();
    }
}

module.exports = styleCompiler;
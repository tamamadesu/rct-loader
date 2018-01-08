/*
 * @Author: tamamadesu
 * @Date: 2018-01-08 10:49:42
 * @Last Modified by: tamamadesu
 * @Last Modified time: 2018-01-08 18:34:40
 */

const pug        = require('pug');
const htmlParser = require('htmlparser2');


const ATTRIBUTE_MAPPING = {
	'for'     : 'htmlFor',
	'class'   : 'className',
	'checked' : 'defaultChecked',
	'value'   : 'defaultValue'
};

class HtmlToJsx {
	constructor(lang,content){
		this.lang    = lang;
		this.content = content;
	}
	toJsx(){
		switch(this.lang){
			case 'html':
				return this.parseDOM();
			case 'pug':
				return this.parsePug();
			default:
				console.log(`没有找到对应${this.lang}-loader解析器，详情查看文档!`);
		}
	}
	formatAttrs(attrs){
		if(!attrs){ return {}; }
		for(let i in attrs){
			if(ATTRIBUTE_MAPPING[i]){
				attrs[ATTRIBUTE_MAPPING[i]] = attrs[i];
				delete attrs[i];
			}
		}
		return attrs;
	}
	handleAst(domJson){
		domJson.forEach(dom=>{
			if(dom.type == 'tag' && dom.children){
				dom.children.forEach(child=>{
					this.formatAttrs(child.attribs);
				});
			}
			dom.attribs = this.formatAttrs(dom.attribs);
		});
		return domJson;
	}
	parsePug(){
		let fn = pug.compile(this.content, {});
		this.content = fn({});
		return this.parseDOM();
	}
	parseDOM(){
		const astConent = htmlParser.parseDOM(this.content,{
			lowerCaseTags:false,
			lowerCaseAttributeNames:false
		});
		return htmlParser.DomUtils.getOuterHTML(this.handleAst(astConent));
	}
}

module.exports = HtmlToJsx;
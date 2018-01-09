/*
* @Author: tamamadesu
* @Date:   2018-01-05 19:06:43
 * @Last Modified by: tamamadesu
 * @Last Modified time: 2018-01-09 10:56:46
* @Description 根据上步loader解析各部分内容
*/

const loaderUtils      = require('loader-utils');
const RctContent       = require('./template.js');
const styleCompiler    = require('./compiler-style');
const templateCompiler = require('./compiler-template');

const replaceTemplateName = 'return (template);';

const parseTemplateFunc = (lang,content) => {
    let parse = new templateCompiler(lang,content);
    return parse.toJsx();
};

const parseStyleFunc = (lang,content) => {
    let string = new styleCompiler(lang,content);
    return string.toStr();
};

module.exports = function(content) {

    if(this.cacheable){
        this.cacheable();
    };

    const parseTemplateCont        = RctContent(content)['template'];
    const { type, lang, isScoped } = loaderUtils.parseQuery(this.query);
    const parseContent             = RctContent(content)[type];

    switch(type){
        case 'script':
            parseContent.content  = parseContent.content.replace(replaceTemplateName,'return (\n ' + parseTemplateFunc(parseTemplateCont.lang,parseTemplateCont.content) + ' \n);\n');
            break;
        case 'style':
            parseContent.content = parseStyleFunc(lang,parseContent.content);
            break;
    }


    // const moduleId = query.moduleId
    // const isScoped = query.isScoped
    this.callback(null, parseContent.content);
}
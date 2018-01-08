/*
* @Author: tamamadesu
* @Date:   2018-01-05 19:06:43
 * @Last Modified by: tamamadesu
 * @Last Modified time: 2018-01-08 12:31:39
* @Description 根据上步loader解析各部分内容
*/

const loaderUtils = require('loader-utils');
const RctContent  = require('./template.js');
const HtmlToJsx    = require('./html2jsx');
const replaceTemplateName = 'return (template);';

const parseTemplateFunc = (lang,content) => {

    let parse = new HtmlToJsx(lang,content);
    return parse.toJsx();
};

const parseStyleFunc = (lang,content) => {
    switch(lang){
        case 'css':
            return '.h2{color:"#fff"}';
        case 'sass':
            return content;
        case 'scss':
            return '.h2{color:"#000"}';
    }
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
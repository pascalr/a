import hljs from 'highlight.js/lib/core'
import hljs_js from 'highlight.js/lib/languages/javascript'
import hljs_json from 'highlight.js/lib/languages/json'
import hljs_xml from 'highlight.js/lib/languages/xml'
import hljs_css from 'highlight.js/lib/languages/css'
import hljs_plaintext from 'highlight.js/lib/languages/plaintext'

hljs.registerLanguage('js', hljs_js);
hljs.registerLanguage('json', hljs_json);
hljs.registerLanguage('xml', hljs_xml);
hljs.registerLanguage('css', hljs_css);
hljs.registerLanguage('plaintext', hljs_plaintext);
hljs.highlightAll();

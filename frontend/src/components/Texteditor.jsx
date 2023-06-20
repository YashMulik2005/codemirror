import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { eclipse } from '@uiw/codemirror-theme-eclipse'
import { basicSetup } from '@uiw/react-codemirror'
import { closeBrackets } from '@codemirror/closebrackets'
import { HighlightStyle, tags } from "@codemirror/highlight"
import { indentOnInput } from '@codemirror/language'
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from "@codemirror/lang-javascript";
import axios from 'axios'

function Texteditor() {
    const [code, setcode] = useState("")
    const [language, setlanguage] = useState(cpp());
    const [processlan, setprocesslan] = useState("cpp14")
    const [output, setoutput] = useState("")
    const [inputdata, setinputdata] = useState("")
    const getcode = React.useCallback((value, viewUpdate) => {
        setcode(value);
    }, [])

    const handlesubmit = async () => {
        const data = {
            code: code,
            inputdata: inputdata,
            language: processlan
        }
        const result = await axios.post('http://localhost:3000/', { "data": data });
        setoutput(result.data.data.result.output);
    }

    const handlelanguage = (e) => {
        setprocesslan(e.target.value);
        (processlan == 'cpp14' ? setlanguage(cpp()) : processlan == 'java' ? setlanguage(java()) : processlan == "python3" ? setlanguage(python()) : setlanguage(cpp()))
    }

    const handleinput = (e) => {
        setinputdata(e.target.value)
    }

    return (
        <div>
            <CodeMirror
                value='hello'
                options={{
                    keyMap: "sublime",
                    mode: cpp(),
                    lineNumbers: true,
                    autoCloseBrackets: true,
                    gutters: ['CodeMirror-linenumbers'],
                    extraKeys: { 'Ctrl-Space': 'autocomplete' },
                    indentUnit: 4,
                    styleSelectedText: true,
                    matchBrackets: true,
                    highlightSelectionMatches: { minChars: 2 },
                    tabSize: 4,
                    indentWithTabs: false,
                    lineWrapping: true,
                    smartIndent: true,
                    autoCloseTags: true,
                    closeBrackets: true,
                    extensions: [basicSetup, closeBrackets(), indentOnInput()],

                }}
                theme={dracula}
                height='400px'
                width='50%'
                extensions={[language]}
                onChange={getcode}
            />
            <button onClick={handlesubmit}>Submit</button>
            <div>{output}</div>
            <form action="">
                <select name="language" onChange={handlelanguage}>
                    <option value="cpp14">C++</option>
                    <option value="c">C language</option>
                    <option value="java">Java</option>
                    <option value="python3">Python</option>
                </select>
            </form>
            <textarea rows={5} cols={10} onChange={handleinput}></textarea>
        </div>
    )
}

export default Texteditor
const TOKENS = [
    {
        "TYPE": "FUNCTION",
        "KEYWORD": "func"
    },
    {
        "TYPE": "VARIABLE",
        "KEYWORD": "var"
    },
    {
        "TYPE": "VARIABLE-LOCAL",
        "KEYWORD": "let"
    },
    {
        "TYPE": "ESTRUCTURE",
        "KEYWORD": "struct"
    },
    {
        "TYPE": "LOOP-FOR",
        "KEYWORD": "for"
    },
    {
        "TYPE": "LOOP-WHILE",
        "KEYWORD": "whl"
    },
    {
        "TYPE": "CONSTANT",
        "KEYWORD": "const"
    },
    {
        "TYPE": "BLOCK-IF",
        "KEYWORD": "if"
    },
    {
        "TYPE": "EMPTY",
        "KEYWORD": ""
    }
]

function compile(input) {
    const GET_TOKEN_TYPE = function (val) {
        let current_token_data = {
            TOKEN: TOKENS[8],
            CONTENT: "",
            NAME: ""
        }

        //function check
        const FUNCTION_EXPRESION = new RegExp(`${TOKENS[0].KEYWORD}[\\n|\\s]+[a-z|A-Z]+\\(.*\\)`, "g")
        if (FUNCTION_EXPRESION.test(val)) {
            current_token_data.TOKEN = TOKENS[0]
            const NAME_FITLER_EXPRESION = new RegExp(`${TOKENS[0].KEYWORD}[\\n|\\s]+[a-z|A-Z]+([^\\n]|)\\(`)
            current_token_data.NAME = val.match(NAME_FITLER_EXPRESION)[0].replace("(", "").replace(TOKENS[0].KEYWORD, "").trim()

            const PARAMETER_FILTER_EXPRESION = /\((.*|)\)/g
            current_token_data.PAREMETERS = val.match(PARAMETER_FILTER_EXPRESION)[0].replace("(", "").replace(")", "").split(",")
            return current_token_data
        }

        //variable check
        const VARIABLE_EXPRESION = new RegExp(`${TOKENS[1].KEYWORD} [^\\n ]*[\\s]*=[\\s]*(\\".*\\"|[^\\s]*)[\\n $]`, "g")
        if (VARIABLE_EXPRESION.test(val)) {
            current_token_data.TOKEN = TOKENS[1]
            current_token_data.CONTENT = val.match(/=(.*)/g)[0].replace("=", "").trim()

            const NAME_FILTER_EXPRESION = new RegExp(`${TOKENS[1].KEYWORD} [a-z|A-Z]+[^\\n|^a-z|^A-Z|^0-9]*=`, "g")
            current_token_data.NAME = val.match(NAME_FILTER_EXPRESION)[0].replace("=", "").replace(TOKENS[1].KEYWORD, "").trim()
            return current_token_data
        }

        //local variable check
        const LOCAL_VARIABLE_EXPRESION = new RegExp(`${TOKENS[2].KEYWORD} [^\\n ]*[\\s]*=[\\s]*(\\".*\\"|[^\\s]*)[\\n $]`, "g")
        if (LOCAL_VARIABLE_EXPRESION.test(val)) {
            current_token_data.TOKEN = TOKENS[2]
            current_token_data.CONTENT = val.match(/=(.*)/g)[0].replace("=", "").trim()

            const NAME_FILTER_EXPRESION = new RegExp(`${TOKENS[2].KEYWORD} (.*)=`, "g")
            current_token_data.NAME = val.match(NAME_FILTER_EXPRESION)[0].replace("=", "").replace(TOKENS[2].KEYWORD, "").trim()
            return current_token_data
        }

        return null
    }
    const lines = input.split("\n")

    for (let line = 0; line < lines.length; line++) {
        const currentLine = lines[line]
        const CURRENT_TOKEN_RESULT = GET_TOKEN_TYPE(currentLine)
        if (CURRENT_TOKEN_RESULT != null)
            console.log(CURRENT_TOKEN_RESULT)
    }
}



//MAIN - TEST
var test = `
func main()
    let kiader = 0
    var iterationCount = 3.5f

func out()
    let inputs = "Juan Carlos"
    let inputs2 = "Pedro"`
console.log(compile(test))

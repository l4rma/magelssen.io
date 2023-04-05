package io.magelssen.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.regex.Pattern;

public class Interpreter {
    private final String text;
    private final ArrayList<Token> tokens;
    private int pos;
    private Token currentToken;

    public Interpreter(String filename) throws IOException {
        this.text = Files.readString(Paths.get(filename));
        this.pos = 0;
        this.currentToken = null;
        this.tokens = new ArrayList<>();
    }

    public void lex() throws Exception {
        this.currentToken = getNextToken();
        this.tokens.add(this.currentToken);
        while (!"EOF".equals(currentToken.getType())) {
            this.currentToken = getNextToken();
            this.tokens.add(this.currentToken);
        }
        printTokens();
    }

    private void error(Character currentChar) throws Exception {
        throw new Exception("Error: Unknown character " + currentChar);
    }

    private void printTokens() {
        for (Token t : this.tokens) {
            System.out.println("Type: " + t.getType() + " Value: " + t.getValue());
        }
    }

    private String advance() {
        if (this.pos >= this.text.length()) {
            return "\0";
        }
        var advancedString = this.text.substring(this.pos++);
        return advancedString;
    }

    private String skipWhitespace() {
        var text = this.text.substring(this.pos++);
        if (this.pos > this.text.length()) {
            return "\0";
        }
        return text;
    }

    private Token getNextToken() throws Exception {
        var text = advance();

        while ('\0' != text.charAt(0)) {
            while (text.length() > 0 && ' ' == (text.charAt(0))) {
                text = skipWhitespace();
            }

            var headerPattern = Pattern.compile("^# (.*\n)");
            var matcher = headerPattern.matcher(text);
            if (matcher.find()) {
                var header = matcher.group();
                this.pos += header.length() - 1;
                return new Token("Header", header.trim().replaceAll("\\n+$", ""));
            }

            var paragraphEnd = Pattern.compile(".*?(?:(?:\n{2})|(?: {2}\n)|(?:\\z))", Pattern.DOTALL);
            matcher = paragraphEnd.matcher(text);
            if (matcher.find()) {
                var words = matcher.group();
                this.pos += words.length()-1;
                return new Token("PARA", words.trim().replaceAll("\\n+$", ""));
            }

            if ('\0' == text.charAt(0)) {
                break;
            }

        }

        return new Token("EOF", null);
    }

}

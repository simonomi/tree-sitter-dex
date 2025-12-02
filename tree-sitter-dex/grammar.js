/**
 * @file Dex grammar for tree-sitter
 * @author alice pellerin
 * @license GPL-3.0-only
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
	name: "dex",
	extras: _ => [],
	rules: {
		source_file: $ => seq(
			repeat(seq($.event, "\n")),
			$.event
		),
		
		event: $ => seq(
			repeat1(seq($._line, "\n"))
		),
		
		_line: $ => choice($.comment, $.command),
		
		comment: _ => /\/\/[^\n]*/,
		
		command: $ => repeat1(choice($.text, $.argument)),
		
		text: _ => /[^<>\n]+/,
		// can be `unknown: `
		
		argument: _ => /<[^<\n]*>/
		// arguments can be/have integers, decimals, hex, ints with text, text, more?
	}
});

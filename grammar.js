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
		
		command: $ => repeat1(choice($.commandText, $.argument)),
		
		commandText: _ => /[^<>\n]+/,
		// can be `unknown: `
		
		argument: $ => seq(
			"<",
			choice($.number, $.prefix, $.suffix, $.argumentText, $.flag, $.vector),
			">"
		),
		
		number: _ => /-?(0x)?[\da-fA-F]+(\.\d+)?/,
		
		argumentText: _ => /[^<>\n0-9]+/,
		
		prefix: $ => seq($.argumentText, " ", $.number),
		suffix: $ => seq($.number, " ", $.argumentText),
		
		flag: $ => seq($.number, " ", $.number),
		
		vector: $ => seq($.number, ", ", $.number)
		
		// /<[^<\n]*>/
		// arguments can be/have integers, decimals, hex, ints with text, text, more?
		// - -?12345.92324
	}
});

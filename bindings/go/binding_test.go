package tree_sitter_dex_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_dex "github.com/tree-sitter/tree-sitter-dex/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_dex.Language())
	if language == nil {
		t.Errorf("Error loading DEX grammar")
	}
}

import XCTest
import SwiftTreeSitter
import TreeSitterDex

final class TreeSitterDexTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_dex())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading DEX grammar")
    }
}

import * as vscode from 'vscode';

const decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "green",
  border: "2px solid white"
});

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.onWillSaveTextDocument(event => {
    const openEditor = vscode.window.visibleTextEditors.filter(
      editor => editor.document.uri === event.document.uri
    )[0];
    decorate(openEditor);
  });
}

function decorate(editor: vscode.TextEditor) {
  let sourceCode = editor.document.getText();
  let regex = /(console\.log)/;

  let decorationsArray: vscode.DecorationOptions[] = [];

  const sourceCodeArr = sourceCode.split("\n");

  for (let line = 0; line < sourceCodeArr.length; line++) {
    let match = sourceCodeArr[line].match(regex);

    if (match !== null && match.index !== undefined) {
      let range = new vscode.Range(
        new vscode.Position(line, match.index),
        new vscode.Position(line, match.index + match[1].length)
      );

      let decoration = { range };

      decorationsArray.push(decoration);
    }
  }

  editor.setDecorations(decorationType, decorationsArray);
}

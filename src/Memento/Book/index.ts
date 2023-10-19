export interface Memento {
  getName(): string;
  getSnapshotDate(): Date;
  getText(): string;
}

class Editor {
  private text: string;

  constructor(private name: string) {
    this.text = "";
  }

  makeSnapshot(): Memento {
    return new Snapshot(this.name, this.text);
  }

  restore(memento: Memento) {
    this.text = memento.getText();
  }

  editText(newText: string) {
    this.text = newText;
  }

  displayText() {
    console.log("Current Text: " + this.text);
  }
}

class Snapshot implements Memento {
  private name: string;
  private text: string;
  private date: Date;

  constructor(name: string, text: string) {
    this.name = name;
    this.text = text;
    this.date = new Date();
  }

  getName(): string {
    return this.name;
  }

  getSnapshotDate(): Date {
    return this.date;
  }

  getText(): string {
    return this.text;
  }
}

const editor = new Editor("Document 1");

editor.editText("This is the initial text");
editor.displayText();

const snapshot1 = editor.makeSnapshot();

editor.editText("Text after editing");
editor.displayText();

editor.restore(snapshot1);
editor.displayText();

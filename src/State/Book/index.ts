export interface State {
  render(): void;
  publish(): void;
}

class Document {
  private state: State;

  constructor() {
    this.state = new DraftState(this);
  }

  changeState(state: State) {
    this.state = state;
  }

  render() {
    this.state.render();
  }

  publish() {
    this.state.publish();
  }
}

class DraftState implements State {
  constructor(private document: Document) {}

  render() {
    console.log("Rendering the document in Draft state");
  }

  publish() {
    console.log("Moving the document to Moderation state");
    this.document.changeState(new ModerationState(this.document));
  }
}

class ModerationState implements State {
  constructor(private document: Document) {}

  render() {
    console.log("Rendering the document in Moderation state");
  }

  publish() {
    console.log("Making the document public in Published state");
    this.document.changeState(new PublishedState(this.document));
  }
}

class PublishedState implements State {
  constructor(private document: Document) {}

  render() {
    console.log("Rendering the document in Published state");
  }

  publish() {
    console.log("The document is already in Published state. Nothing to do.");
  }
}

const document = new Document();

document.render();
document.publish();
document.publish();
document.render();
document.publish();

/**
 * EN: Real World Example for the Prototype design pattern
 *
 * Need: To have a Document class with several components that can be copied & pasted
 *
 * Solution: All components should have the ability to clone themselves
 */

/**
 * EN: The component extends the Cloneable interface
 *
 */
export interface Cloneable<T> {
    clone(): T;
}

export class ComponentPrototype implements Cloneable<ComponentPrototype> {
    clone(): ComponentPrototype {
        return { ...this };
    }
}

/**
 * EN: The document class
 *
 */
export class Document extends ComponentPrototype {
    components: ComponentPrototype[] = [];

    clone(): Document {
        const clonedDocument = new Document();
        clonedDocument.components = this.components.map(c => c.clone());
        return clonedDocument;
    }

    add(component: ComponentPrototype) {
        this.components.push(component);
    }
}

/**
 * EN: Some components to add to a document
 *
 */
export class Title extends ComponentPrototype {
    constructor(public text: string) {
        super();
    }

    setText(text: string) {
        this.text = text;
    }
}

export class Drawing extends ComponentPrototype {
    constructor(public shape: 'circle' | 'square' | 'line') {
        super();
    }

    setShape(shape: 'circle' | 'square' | 'line') {
        this.shape = shape;
    }
}

export class TextBox extends ComponentPrototype {
    constructor(public text: string) {
        super();
    }

    setText(text: string) {
        this.text = text;
    }
}

export class Link extends ComponentPrototype {
    constructor(public text: string, public url: string) {
        super();
    }

    setText(text: string) {
        this.text = text;
    }

    setUrl(url: string) {
        this.url = url;
    }
}

/**
 * EN: The client code.
 *
 */
const document = new Document();
const title = new Title('Example Domain');
const textbox = new TextBox('This domain is for use in illustrative examples');
document.add(title);
document.add(new Drawing('line'));
document.add(textbox);
document.add(new Link('example.com', 'https://example.com/'));

const clonedDocument = document.clone();

title.setText('New title for the original document');
textbox.setText('New textbox text for the original document');

console.log('document is:');
console.log(document);
console.log('clonedDocument is:');
console.log(clonedDocument);

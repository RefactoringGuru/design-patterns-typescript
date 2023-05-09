/**
 * EN: Real World Example for the Bridge Design Pattern
 *
 * Need: Define different views (with or w/o icon, with or w/o description...)
 * for different content types in a list inside a webpage
 *
 * Solution: Create a bridge for the 2 dimensions:
 *             - View (abstraction)
 *             - Content type (implementation)
 *
 * Credits to: https://github.com/martincrb/bridge-design-pattern/blob/main/bridgePattern.ts
 */

/**
 * EN: The Abstraction defines the interface for the first dimension, in this
 * case the different list item views we have for a given content
 */
abstract class ListItemViewAbstraction {
    constructor(protected contentType: ContentTypeImplementation) {
    }

    abstract getRenderedItem(): string;
}

/**
 * EN: The Implementation defines the interface for the second dimension = all
 * the content types
 */
interface ContentTypeImplementation {
    renderTitle(): string;
    renderCaption(): string;
    renderThumbnail(): string;
    renderLink(): string;
}

/**
 * EN: Now we can extend the Abstraction with the different views and
 * independently of the content types
 */
class VisualListItemView extends ListItemViewAbstraction {
    getRenderedItem(): string {
        return `    <li>
        ${this.contentType.renderThumbnail()}
        ${this.contentType.renderLink()}
    </li>`;
    }
}

class DescriptiveListItemView extends ListItemViewAbstraction {
    getRenderedItem(): string {
        return `    <li>
        ${this.contentType.renderTitle()}
        ${this.contentType.renderCaption()}
    </li>`;
    }
}

/**
 * EN: Time to create the different implementations, in this case the different
 * content types we have in our application: posts, videos, articles, tweets...
 */
class PostContentType implements ContentTypeImplementation {
    constructor(
        protected title,
        protected caption,
        protected imageUrl,
        protected url) {}

    renderTitle(): string {
        return `<h2>${this.title}<h2>`;
    }
    renderCaption(): string {
        return `<p>${this.caption}</p>`;
    }
    renderThumbnail(): string {
        return `<img alt='${this.title}' src='${this.imageUrl}'/>`;
    }
    renderLink(): string {
        return `<a href='${this.url}'>${this.title}</a>`;
    }
}

class VideoContentType implements ContentTypeImplementation {
    constructor(
        protected title,
        protected description,
        protected thumbnailUrl,
        protected url) {}

    renderTitle(): string {
        return `<h2>${this.title}<h2>`;
    }
    renderCaption(): string {
        return `<p>${this.description}</p>`;
    }
    renderThumbnail(): string {
        return `<img alt='${this.title}' src='${this.thumbnailUrl}'/>`;
    }
    renderLink(): string {
        return `<a href='${this.url}'>${this.title}</a>`;
    }
}

class TweetContentType implements ContentTypeImplementation {
    constructor(
        protected tweet,
        protected profilePictureUrl,
        protected tweetUrl) {}

    renderTitle(): string {
        return `<h2>${this.tweet.substring(0, 50)}...<h2>`;
    }
    renderCaption(): string {
        return `<p>${this.tweet}</p>`;
    }
    renderThumbnail(): string {
        return `<img alt='${this.tweet.substring(0, 50)}...' src='${this.profilePictureUrl}'/>`;
    }
    renderLink(): string {
        return `<a href='${this.tweetUrl}'>${this.tweet.substring(0, 30)}...</a>`;
    }
}

/**
 * EN: The client code only depends on the Abstraction. Now we can extend
 * abstractions (i.e. add new views) without impacting implementations
 * (content types). Also we can add new content types without impacting
 * anything from the views.
 */
const content = [
    new PostContentType(
        'New example available on RefactoringGuru',
        'Bridge design pattern now has a real world example',
        'http://img.sample.org/bridge.jpg',
        'https://refactoring.guru/design-patterns/bridge',
    ),
    new TweetContentType(
        'Windows will support Linux executables natively on Windows 12',
        'http://img.sample.org/profile.jpg',
        'https://twitter.com/genbeta/387487346856/',
    ),
    new VideoContentType(
        'BRIDGE | Patrones de Diseño',
        'En éste vídeo de la serie de PATRONES DE DISEÑO veremos el PATRÓN BRIDGE!',
        'http://img.sample.org/bridge.jpg',
        'https://www.youtube.com/watch?v=6bIHhzqMdgg',
    ),
];

/**
 * EN: The client code can use any Abstraction to render items
 */
const visualList = content.map(i => new VisualListItemView(i));
console.log('<h1>Visual Page</h1>');
console.log('<ul>');
for (const visualItem of visualList) {
    console.log(visualItem.getRenderedItem());
}
console.log('</ul>');

const descriptiveList = content.map(i => new DescriptiveListItemView(i));
console.log('<h1>Descriptive Page</h1>');
console.log('<ul>');
for (const descriptiveItem of descriptiveList) {
    console.log(descriptiveItem.getRenderedItem());
}
console.log('</ul>');

# Design Patterns in TypeScript

This repository is part of the [Refactoring.Guru](https://refactoring.guru/design-patterns) project.

It contains TypeScript examples for all classic GoF design patterns. Each pattern includes two examples:

- [x] **Conceptual** examples show the internal structure of patterns, including detailed comments.

- [ ] **RealWorld** examples show how patterns can be used in real-world web applications.

## Requirements

For simplicity reasons, the examples are console apps. In order to launch them, you have to install [Node.js and NPM](https://nodejs.org/en/) on your computer and then install [TypeScript compiler](https://github.com/Microsoft/TypeScript) and [TypeScript Node extension](https://github.com/TypeStrong/ts-node) like this:

```
npm install -g typescript
npm install -g ts-node
```

When you have all the required software installed, the examples can be launched via the command line as follows:

```
ts-node src/Path-to-example/Example.ts
```

For the best experience, I recommend working with examples with these IDEs:

- [WebStorm](https://www.jetbrains.com/webstorm/)
- [Visual Studio Code](https://code.visualstudio.com/)


## Contributor's Guide

I appreciate any help, whether it's a simple fix of a typo or a whole new example. Just [make a fork](https://help.github.com/articles/fork-a-repo/), make your change and submit a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

Here's a style guide which might help you to keep your changes consistent with the rest of the project's code:

1. All code should follow these two guidelines: [Unofficial TypeScript StyleGuide](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md) and [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

2. Try to hard wrap the code at 80th's character. It helps to list the code on the website without scrollbars.

3. Example files should be located and named in the following manner:

    ```
    src/{PatternName}/{ExampleName}/index.ts
    ```

4. Aim to put all code within one file. Yes, I realize that it's not how it supposed to be done in production. But it helps people to better understand examples, since all code fits into one screen.

5. Comments may or may not have language tags in them, such as this:

    ```typescript
    /**
     * EN: All products families have the same varieties (MacOS/Windows).
     *
     * This is a MacOS variant of a button.
     *
     * RU: Все семейства продуктов имеют одни и те же вариации (MacOS/Windows).
     *
     * Это вариант кнопки под MacOS.
     */
    ```

    This notation helps to keep the code in one place while allowing the website to generates separate versions of examples for all listed languages. Don't be scared and ignore the non-English part of such comments. If you want to change something in a comment like this, just do it. Even if you do it wrong, we'll tell you how to fix it during the Pull Request.


## License

This work is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a>


## Credits

Authors: Alexey Pyltsyn ([@lex111](https://github.com/lex111)) and Alexander Shvets ([@neochief](https://github.com/neochief))

# Contributor's guide
I appreciate any help, whether it's a simple fix of a typo or a whole new example. Just [make a fork](https://help.github.com/articles/fork-a-repo/), make your change and submit a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

Here's a style guide which might help you to keep your changes consistent with the rest of the project's code:

1. All code should follow these two guidelines: [Unofficial TypeScript StyleGuide](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md) and [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

2. Try to hard wrap the code at 80th character. It helps to list the code on the website without horizontal scrollbars.

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

    This notation helps to keep the code in one place while allowing the website to generate separate versions of examples for all listed languages. Don't be scared and ignore the non-English part of such comments. If you want to change something in a comment like this, just do it. Even if you do it wrong, we'll tell you how to fix it during the review of your Pull Request.

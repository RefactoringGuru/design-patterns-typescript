import * as fs from "fs/promises";

/**
 * Example Facade pattern for a ETL process.
 * In this example I have created three subsystems.
 * The first one is the Loader (DataSource), which is a file system.
 * The second one is the Parser (DataTransformer), which is a string parser.
 * The third one is the Writer (DataSink), which is a file system.
 * 
 * To keep the example simple, in the loader I'm not doing input validation.
 * In a real world scenario, I would do it creating a validation layer 
 * on the extractor and passing the parsed result to the transformer.
 */

type Map = { [key: string]: any };

interface Extractor {
  extract(): Promise<string>;
}

interface Transformer {
  transform(input: string): Map;
}

interface Loader {
  load(input: Map): Promise<any>;
}

class FileExtractor implements Extractor {
  filepath: string;
  constructor(filepath: string) {
    this.filepath = filepath;
  }

  public async extract() {
    //load file from this.filepath
    return fs.readFile(this.filepath, "utf8");
  }
}

class FileLoader implements Loader {
  filepath: string;
  constructor(filepath: string) {
    this.filepath = filepath;
  }
  public async load(input: Map) {
    return fs.writeFile(this.filepath, JSON.stringify(input, undefined, 4));
  }
}

class FileTransformer implements Transformer {
  public transform(input: string): Map {
    let result: Map = {};

    input.split("\n").forEach((line) => {
      if (line.trim().length === 0) return;

      const [key] = line.split(",");
      if (typeof result === "undefined") {
      }
      if (typeof result[key] === "undefined") {
        result[key] = 0;
      }
      result[key] = result[key] + 1;
    });

    return result;
  }
}

/**
 * The Facade class is the main class of the Facade pattern.
 * It's responsible for creating the subsystems and calling their methods.
 * I'm injecting the subsystems in the constructor.
 * In the process method I'm calling the extract, transform and load methods of the subsystems.
 */
class ETLProcessor {
  extractor: Extractor;
  transformer: Transformer;
  loader: Loader;

  constructor(extractor: Extractor, transformer: Transformer, loader: Loader) {
    this.extractor = extractor;
    this.transformer = transformer;
    this.loader = loader;
  }

  public async process() {
    const input = await this.extractor.extract();
    const transformed = this.transformer.transform(input);
    return this.loader.load(transformed);
  }
}

const processor = new ETLProcessor(
  new FileExtractor("input.txt"),
  new FileTransformer(),
  new FileLoader("output.json")
);

processor.process().then(() => {
  console.log("Process completed");
});

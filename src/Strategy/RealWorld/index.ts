import * as fs from "fs/promises";
import * as path from "path";

interface UploadResult {
  success: boolean;
  message: string;
}

interface UploadStrategy {
  upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult>;
}

/**
 * Working implementation of the strategy to upload a file to a local directory.
 */
class LocalUpload implements UploadStrategy {

  /**
   * Uploads a file to a local directory.
   * @param filePath The path to the directory to upload to.
   * @param name The name of the file to upload.
   * @param content The content of the file to upload.
   * @returns A promise that resolves to the result of the upload.
   */
  public upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const result: UploadResult = {
        success: true,
        message: "Uploaded to local storage",
      };

      fs.writeFile(path.join(__dirname, filePath, name), content)
        .then(() => {
          resolve(result);
        })
        .catch((e) => {
          result.success = false;
          result.message = "Error uploading to local storage";
          reject(result);
        });
    });
  }
}

/**
 * This is only a mock implementation of the upload strategy.
 * It is not a real strategy, but it is enough for the example.
 */
class AWSUpload implements UploadStrategy {
  public upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const result: UploadResult = {
        success: true,
        message: "Uploaded to AWS storage",
      };

      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }
}

class Context {
  private strategy: UploadStrategy;

  constructor(strategy: UploadStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: UploadStrategy) {
    this.strategy = strategy;
  }

  /**
   * EN: The Context delegates some work to the Strategy object instead of
   * implementing multiple versions of the algorithm on its own.
   *
   */
  public fileUpload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return this.strategy.upload(filePath, name, content);
  }
}


/**
 * I'm creating to different strategies to upload a file to different places.
 */
const localUpload = new LocalUpload();
const awsUpload = new AWSUpload();

const context = new Context(localUpload);

context.fileUpload("/", "Output.txt", "Hello World").then((result) => {
  console.log(result);
});

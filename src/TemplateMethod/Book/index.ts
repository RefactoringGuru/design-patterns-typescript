abstract class DataMiner {
  // Template method: Define the overall data mining process
  mine(path: string): void {
    this.openFile(path);
    this.extractData();
    this.parseData();
    this.analyzeData();
    this.sendReport();
    this.closeFile();
  }

  // Abstract methods: Subclasses must implement these
  abstract openFile(path: string): void;
  abstract extractData(): void;
  abstract closeFile(): void;
  abstract parseData(): void;

  // Optional methods: Default implementations are provided and can be overridden
  analyzeData() {
    console.log("Analyzing data... (Default implementation)");
  }

  sendReport() {
    console.log("Sending report... (Default implementation)");
  }
}

class DocDataMiner extends DataMiner {
  openFile(path: string) {
    console.log(`Opening DOC file: ${path}`);
  }

  extractData() {
    console.log("Extracting data from DOC file");
  }

  closeFile() {
    console.log("Closing DOC file");
  }

  parseData() {
    console.log("Parsing data from DOC file");
  }
}

class CSVDataMiner extends DataMiner {
  openFile(path: string) {
    console.log(`Opening CSV file: ${path}`);
  }

  extractData() {
    console.log("Extracting data from CSV file");
  }

  closeFile() {
    console.log("Closing CSV file");
  }

  parseData() {
    console.log("Parsing data from CSV file");
  }
}

class PDFDataMiner extends DataMiner {
  openFile(path: string) {
    console.log(`Opening PDF file: ${path}`);
  }

  extractData() {
    console.log("Extracting data from PDF file");
  }

  closeFile() {
    console.log("Closing PDF file");
  }

  parseData() {
    console.log("Parsing data from PDF file");
  }
}

// Client code
const docDataMiner = new DocDataMiner();
const csvDataMiner = new CSVDataMiner();
const pdfDataMiner = new PDFDataMiner();

docDataMiner.mine("data.doc");
csvDataMiner.mine("data.csv");
pdfDataMiner.mine("data.pdf");

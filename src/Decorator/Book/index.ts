export interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  constructor(private emails: string[]) {}

  send(message: string): void {
    console.log(`Sending email to ${this.emails}: ${message}`);
  }
}

class SMSDecorator implements Notifier {
  constructor(private notifier: Notifier) {}

  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
    this.notifier.send(message);
  }
}

class FacebookDecorator implements Notifier {
  constructor(private notifier: Notifier) {}

  send(message: string): void {
    console.log(`Sending Facebook message: ${message}`);
    this.notifier.send(message);
  }
}

class SlackDecorator implements Notifier {
  constructor(private notifier: Notifier) {}

  send(message: string): void {
    console.log(`Sending Slack message: ${message}`);
    this.notifier.send(message);
  }
}

const emailNotifier = new EmailNotifier([
  "user1@example.com",
  "user2@example.com",
]);

const combinedNotifier = new SlackDecorator(
  new FacebookDecorator(new SMSDecorator(emailNotifier))
);

combinedNotifier.send("Important message: House is on fire!");

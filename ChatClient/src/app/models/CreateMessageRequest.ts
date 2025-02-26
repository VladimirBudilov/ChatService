export class CreateMessageRequest {
  Text: string;
  UserId: string;

  constructor(text: string, userId: string) {
    this.Text = text;
    this.UserId = userId;
    console.log('CreateMessageRequest created', this.Text);
  }
}

import { retry } from '@alvelive/helpers';

export class AlvePublish {
  private constructor() {}

  static create(): AlvePublish {
    return new AlvePublish();
  }

  async publish(): Promise<void> {
    await retry({
      action: async () => {
        // eslint-disable-next-line no-console
        console.log('Publishing');
      },
    });
  }
}

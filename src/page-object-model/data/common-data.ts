import { randParagraph, randSentence } from '@ngneat/falso';

export namespace CommonData {
  export function randomSentence(valueLength = 5): string {
    return randSentence({ length: valueLength })[0] as string;
  }
  export function randomParagraph(valueLength = 100): string {
    return randParagraph({ length: valueLength })[0] as string;
  }
}
export default { CommonData };

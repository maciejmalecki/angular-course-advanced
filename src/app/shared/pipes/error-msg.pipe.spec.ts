import { ErrorMsgPipe } from './error-msg.pipe';

describe('ErrorMsgPipe', () => {

  const pipe: ErrorMsgPipe = new ErrorMsgPipe()

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns empty string for null value', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('returns non-personalized field message for required', () => {
    expect(pipe.transform({ required: true })).toBe('Value for this field is required.');
  });

  it('returns personalized field message for required', () => {
    expect(pipe.transform({ required: true }, 'foo bar')).toBe('Value for foo bar is required.');
  });

});

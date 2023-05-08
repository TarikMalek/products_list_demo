export const TEST = 'TEST';


export const setTestState = (test) => {
  return {
    type: TEST,
    payload: test
  };
};
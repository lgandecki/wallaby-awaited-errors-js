const awaitErrorWithChangedStack = () => {
  const newError = new Error("Hello");
  const newStackPosition = newError.stack.split("\n")[2];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newError = new Error("Error with changed stack");
      const newStackArray = newError.stack.split("\n");
      newStackArray.push(newStackPosition);
      newError.stack = newStackArray.join("\n");
      reject(newError);
    }, 100);
  });
};

test("async await error with changed stack", async () => {
  const a = "";
  await awaitErrorWithChangedStack();
});

test("normal error", async () => {
  const simpleNonAsyncThrowingFunction = () => {
    const error = new Error("normal error");

    throw error;
  };

  const a = "";
  simpleNonAsyncThrowingFunction();
});

test("async await error", async () => {
  async function simpleAsyncThrowingFunction() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("async await error"));
      });
    });
  }

  await simpleAsyncThrowingFunction();
  const a = "";
});

import open from 'open';

export const openFile = async (filePath: string) => {
  try {
    await open(filePath);
  } catch (error) {
    console.error('Failed to open file:', error);
  }
};

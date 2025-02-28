import { ArtifactKind } from '@/components/artifact';
import fs from 'fs';
import path from 'path';

// 定义读取和格式化 .md 文件内容的逻辑
const readMdFiles = (folderPath: string): Record<string, string> => {
  const files = fs.readdirSync(folderPath);
  const filesContent: Record<string, string> = {};

  files.forEach((file: string) => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(folderPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const contentWithoutEmptyLines = content
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .join('\n');
      filesContent[file] = contentWithoutEmptyLines;
    }
  });

  return filesContent;
};

const formatContent = (filesContent: Record<string, string>): string => {
  let result = '';
  let count = 0; // 添加计数器

  for (const [fileName, content] of Object.entries(filesContent)) {
    if (count >= 7) break; // 如果已经处理了 10 个数据，停止遍历

    result += `File: ${fileName}\n`;
    result += `Content:\n${content}\n`;
    result += `不要从国际晶体学表推断，要从我给你的资料中判断！！！`;
    result += '-'.repeat(2) + '\n';

    count++; // 计数器加 1
  }

  return result;
};


// 示例文件夹路径
const folderPath = '/workspaces/ai-chatbot/data/'; // 替换为你的文件夹路径

// 读取 .md 文件并格式化内容
const mdFilesContent = readMdFiles(folderPath);
const formattedContent = formatContent(mdFilesContent);

// 将格式化后的内容嵌入到 regularPrompt 中
export const artifactsPrompt = ``;

export const regularPrompt = `以下是读取的 .md 文件内容：\n\n${formattedContent}`;

console.log(regularPrompt);
export const systemPrompt = ({
  selectedChatModel,
}: {
  selectedChatModel: string;
}) => {
  if (selectedChatModel === 'chat-model-reasoning') {
    return regularPrompt;
  } else {
    return `${regularPrompt}\n\n${artifactsPrompt}`;
  }
};

export const codePrompt = ``;

export const sheetPrompt = ``;

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind,
) =>
  type === 'text'
    ? `\
Improve the following contents of the document based on the given prompt.

${currentContent}
`
    : type === 'code'
      ? `\
Improve the following code snippet based on the given prompt.

${currentContent}
`
      : type === 'sheet'
        ? `\
Improve the following spreadsheet based on the given prompt.

${currentContent}
`
        : '';
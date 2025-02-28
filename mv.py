import os
import glob

def read_md_files(folder_path):
    # 使用 glob 模块获取文件夹下所有的 .md 文件
    md_files = glob.glob(os.path.join(folder_path, '*.md'))
    
    # 创建一个字典来存储文件名和文件内容
    files_content = {}
    
    # 遍历所有 .md 文件
    for md_file in md_files:
        # 获取文件名（不带路径）
        file_name = os.path.basename(md_file)
        
        # 读取文件内容
        with open(md_file, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 将文件名和内容存入字典
        files_content[file_name] = content
    
    return files_content

def save_to_file(output_file, files_content):
    # 将结果写入文件
    with open(output_file, 'w', encoding='utf-8') as file:
        for file_name, content in files_content.items():
            file.write(f"File: {file_name}\n")
            file.write(f"Content:\n{content}\n")
            file.write("-" * 40 + "\n")  # 添加分隔线

# 示例用法
folder_path = 'data'  # 替换为你的文件夹路径
output_file = 'output.txt'  # 替换为你想保存结果的文件名

# 读取 .md 文件
md_files_content = read_md_files(folder_path)

# 将结果保存到文件
save_to_file(output_file, md_files_content)

print(f"结果已保存到文件: {output_file}")
INSERT INTO "User" (id, email, password)
VALUES (
  gen_random_uuid(),  -- 生成一个新的 UUID
  'example@example.com',  -- 用户的电子邮件
  'hashed_password'  -- 用户的密码（应为哈希值）
);

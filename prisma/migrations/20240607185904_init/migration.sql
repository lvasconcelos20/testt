/*
  Warnings:

  - You are about to alter the column `name` on the `tarefa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(140)`.

*/
-- AlterTable
ALTER TABLE `tarefa` MODIFY `name` VARCHAR(140) NOT NULL;

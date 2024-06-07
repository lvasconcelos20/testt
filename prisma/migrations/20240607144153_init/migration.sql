-- AlterTable
ALTER TABLE `tarefa` MODIFY `data_termino` VARCHAR(191) NOT NULL,
    ALTER COLUMN `prioridade` DROP DEFAULT;

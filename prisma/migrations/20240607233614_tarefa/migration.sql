-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(140) NOT NULL,
    `finalizada` BOOLEAN NOT NULL DEFAULT false,
    `data_termino` VARCHAR(191) NOT NULL,
    `prioridade` ENUM('baixa', 'media', 'alta') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

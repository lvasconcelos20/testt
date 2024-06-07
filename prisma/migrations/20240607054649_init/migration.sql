-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `decricao` VARCHAR(140) NOT NULL,
    `finalizada` BOOLEAN NOT NULL DEFAULT false,
    `data_termino` DATETIME(3) NOT NULL,
    `prioridade` ENUM('baixa', 'media', 'alta') NOT NULL DEFAULT 'baixa',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
